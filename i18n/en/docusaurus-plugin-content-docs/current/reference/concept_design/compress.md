---
title: Compression Algorithm
order: 4
---

# Compression Algorithm

Because of the large scale of time-series data and the potential for large amounts of redundancy, compression methods are frequently used in the time series database to save storage space and query the I/O costs of implementation, compression techniques that are common in some time series databases are discussed below.

The specific storage structure of different time series databases differs significantly from the design of compression algorithms.The base layer of the distributed time-series database represented by the Open TSDB is based on HBase cluster storage, where basic time-series data models exist for compressed storage based on the basic characteristics of the time-series data.Open TSDB uses classical compression algorithms to reduce sequence memory usage by encoding index names and each tag with each sequence name.However, there are still many useless fields that cannot be effectively compressed and have weak aggregation capabilities.InfluxDB has a more abundant data type, InfluxDB is encoded in whole data, and compression of integer codes depends on the range of original values.Timestamp is a stand-alone data type and has a certain pattern to follow, in InfluxDB, after sorting over timestamps, then encoded using delta algorithms before using different algorithms based on encoding results.With regard to CnosDB compression algorithm, the following content will help you understand it more clearly.

### DELTA

Mainly used for timestamp, integer and unsigned integer.

#### Principle

First, the difference is made, that is, the first data is unchanged, other data are transformed into delta with the previous data, and all numbers are processed byzigzag, i64 is mapped to u64, specifically to zero, negative numbers are mapped to odd numbers, such as [0, 1, 2] after zigzag processing to [0, 1,2] and maximum convention numbers are calculated. Then judge that if all deltas are the same, use the cruise path code directly, that is, only the first value, delta, and the number of data. Otherwise, all delta values are divided into maximum convention numbers (maximum convention numbers are encoded into data), and then encoded using Simple 8b.It is then judged that if all delta are identical, the code is directly used, i.e. only the amount of the first value, delta and data is to be recorded.Compared with the delta algorithm and the gorilla algorithm, because the difference algorithm is also used, it is roughly the same in the selection of applicable data.

![](/img/simple8b.png)

Simple 8b is a compression algorithm that encapsulates multiple integers to a 64-bit integer, the first four-bit as selector to specify the number and validity of integers stored in the remaining 60 bits, and the latter 60 bits are used to store multiple integers. In addition, when delta is larger than the maximum range of Simple 8b energy encoding (more than 1<60-1, generally not) does not compress and stores arrays directly.The Revolving Door Trend (SDT) is an online lossy data compression algorithm traditionally used in Supervisory Control and Data Acquisition (SCADA) systems designed to store historical data of Procedural information Systems (PIMs).
SDT has low computational complexity and uses a linear trend to represent a certain amount of data. Its most important parameter is the compression deviation, which represents the maximum difference between the current sample and the current linear trend used to represent the previously collected data.
The idea is to look at the compression offset coverage between the current data point and the previous retained data point to decide which data to choose. If the offset coverage area can cover all points in between, the data point is not retained. If a number of points fall outside the compression offset coverage area, it is retained when
The previous point of the previous data point and take the latest retained data point as the new starting point.

#### Applicability

In some time-consuming data, assuming that data is collected every five seconds, the time stamp is 5, that all timestamps can be restored through only three numbers, with extremely high compression, while some delta does not guarantee consistent scenarios, i.e., where using Simple 8b, are more suitable for smaller, floating data.

In the absence of specifying compression algorithms, we use this compression algorithm for timemarks, integer and unsigned integers, and the compression rate is higher.

### GORILLA

Mainly used for floating point type.

#### Principle

The principle of Gorilla is similar to the difference, the difference is that the difference is the difference between two data, and gorilla is different or different. The first data is not processed at the time of coding, and if the previous data is different from the previous data, if the difference or value is 0, repeat it with the previous data, write a patch to represent repetition, and, if not zero, calculate the first zero and back derivative zeros of the heterogeneous or value delta. If the number is the same, only the intermediate valid bit is encoded. If the number is different, the first 0.5 bits are derived, the back 0. 5 bits are written, and then the intermediate valid bit is written.The first data is not processed at the time of encoding and the latter data is calculated as different from the previous data or, if the value is 0, duplicates the previous data by writing a supplement, calculates the lead zero and back zero for the difference or value delta or, if the number is the same, encoded only the middle position and 5 for the lead if the number differs, then zero for 6 and then write the intermediate valid position.

![](/img/gorilla.png)

#### Applicability

As compared with delta type, it is also suitable for time-order data scenarios, and we may collect data in different locations, but the toponymic-related information collected at the same location is generally consistent, in which the compression rate is higher than that of compression efficiency.

In the absence of specifying compression algorithms, we specify this compression algorithm for floating point type by default.

### QUANTILE

Mainly used for timestamps, integers, unsigned integers and floating points.

#### Principle

Qantile supports multiple levels of compression, and CosDB currently uses the default compression level.

Describe each data with the Hafman encoding and offset, using the Hafman code in the range [lower, upper], the offset specifies the exact location within that range.Each data is described by Huffman coding and offset, and the offset specifies the exact location of the range of the data by the Huffman code corresponding to the range of the data. For each block compression, the difference processing is first carried out, the data after the difference is replaced by the current data, then the current array is divided into multiple blocks at an interval of 128, each block determines a range and associated metadata, while calculating the maximum number of conventions per block, optimizes the number of conventions as appropriate, and merges some adjacent blocks, then determines its Huffman encoding based on the weight of each block in the data, and finally encodes the data using them.

![](/img/quantile.png)

#### Applicability

Comparing the delta algam with the gorilla algorithm, which also uses differential algorithms, the choice of applicable data is broadly the same, and quantile algorithms result in lower compression efficiency, with a gap of approximately 5 to 10 times, and a slightly better compression rate than delta and gorilla algorithms.

The longitudinal axis of the image is the compression ratio, the time is only relative.

![](/img/f64_codec.png)

![](/img/i64_codec.png)

### BITPACK

Mainly used for Boolean types.

#### Principle

The size of a bool-type data is a byte, and for the information that bool represents, it&apos;s only one bit to represent so that we can assemble eight bool-type data into one byte.

#### Applicability

No matter what data, we can ensure a compression ratio of nearly eight times that we specify this compression algorithm for the Boolean type by default without specifying the compression algorithm.

### String Compression Algorithm

The string compression algorithm currently supported is compressed, such as below.

![](/img/str_comrpess_ratio.png)

And compressed time and decompression time, units are us.

![](/img/str_compress_time.png)

#### SNPPY

Snappy algorithms are not designed to minimize compression or are not designed to be compatible with any other compression library. Instead, its goal is to be very high compression efficiency and reasonable compression rates, so it is recommended to use snappy more efficiently.Rather, it aims at very high compression efficiency and reasonable compression, and therefore recommends the use of snapmy when there is a greater need for efficiency.

In the absence of specifying a string compression algorithm, we specify this compression algorithm by default.

#### ZSTs

Zstd supports multiple compression levels, and CnosDB currently uses the default compression level.

Zstd, known as Zstand, is a fast compression algorithm that provides high compression ratio, and Zstt uses a finite state entropy encoder. A very powerful compromise scheme for compression speed/compression rate is provided.A very powerful compression speed/compression compromise solution is provided.

#### GZIP/ZLIB

Gzip is similar to zlib. For files to be compressed, a variant of the LZ77 algorithm is first used to compress the results by using Huffman coding, with high compression rate but also time-consuming. Both algorithms are widely used and have similar performances and can be selected according to the situation.Both of these algorithms are used more widely, with similar performance and can be selected according to the circumstances.

#### BZIP

Compared with several other algorithms, the compression rate is higher, but the compression efficiency is lower, which can be used for scenarios that require extreme compression rate, in general less recommended.

### Lossy Compression Algorithm

:::tip
Enterprise only support
:::

#### SDT Compression Algorithm

Mainly used for integer, unsigned integer, floating point type.

Rotation gate trends (SDT) are an online compression algorithm, traditionally used for surveillance and data collection (SCADA), and designed to store historical data from the process information system (PIMs).
The SDT calculates a low degree of complexity and uses linear trends to denote a certain amount of data.Its most important parameter is the compression of the deviation, which indicates the largest difference between the current sample and the current linear trend used to denote previously collected data.
The rationale is to determine the choice of data by viewing the current data point and the compressed offset overlay formed by the previous reserved data point.If the offset covers can cover all points between them, the data point will not be retained; if there is a data point falling outside the compressed offset cover, the previous point will be retained when the data point is
before the data point is last reserved as a new starting point.

##### Algorithm parameters

Deviation：positive float.Deviation: A positive floating point number It represents the maximum difference between the current sample and the current linear trend.

#### Dead zone compression algorithm

Mainly used for integer, unsigned integer, floating point type.

The principle of the dead zone compression algorithm is: for the time series variable data, the variable change limit (namely dead zone, or threshold) is defined. If the deviation between the current data and the last stored data exceeds the specified dead zone, the current data will be saved, otherwise the current data will be discarded. This algorithm only needs to compare the continuous data from the time series with the previous saved data to determine whether the data needs to be saved. Because of this, it is easy to understand and implement, and most real-time databases with lossy compression provide this compression method.Deviation: A positive floating point number The absolute or relative value of the allowable deviation when using the algorithm, based on the last saved number. It determines the compression rate of the algorithm and the accuracy of the compressed data.

##### Algorithm parameters

Deviation: floating points.The algorithm is used to allow an absolute or relative value of the deviation, based on the last saved number.It determines the compression rate of algorithms, as well as the accuracy of the post-compressed data.
