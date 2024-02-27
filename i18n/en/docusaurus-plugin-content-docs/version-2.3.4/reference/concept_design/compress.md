---
title: Compression Algorithm
order: 4
---

# Compression Algorithm

Because of the large scale of time-series data and the potential for large amounts of redundancy, compression methods are frequently used in the time series database to save storage space and query the I/O costs of implementation, compression techniques that are common in some time series databases are discussed below.

The specific storage structure of different time series databases differs significantly from the design of compression algorithms.The base layer of the distributed time-series database represented by the Open TSDB is based on HBase cluster storage, where basic time-series data models exist for compressed storage based on the basic characteristics of the time-series data.Open TSDB uses classical compression algorithms to reduce sequence memory usage by encoding index names and each tag with each sequence name.However, there are still many useless fields that cannot be effectively compressed and have weak aggregation capabilities.InfluxDB has a more abundant data type, InfluxDB is encoded in whole data, and compression of integer codes depends on the range of original values.Timestamp is a stand-alone data type and has a certain pattern to follow, in InfluxDB, after sorting over timestamps, then encoded using delta algorithms before using different algorithms based on encoding results.With regard to CnosDB compression algorithm, the following content will help you understand it more clearly.

### DELTA

Used mainly for timestamp, integer, and unsigned integs.

#### Principles

The difference is made first, that the first data are not changed, that the other data are converted to delta from the previous data and then all the figures are processed by zigzag, with i64 being mapped to u64, specifically 0 to 0, negative to odds, positive to events, e.g. [0, -1, 1-2] being converted to [0, 2,3] after zigzag, and the maximum Convention number is calculated.It is then judged that if all delta are identical, the code is directly used, i.e. only the amount of the first value, delta and data is to be recorded.Otherwise, all delta values will be divided by the maximum number of conventions (the maximum number of conventions will also be encoded into data) and then encoded using simple8b.

![](/img/simple8b.png)

simple8b is a compressed algorithm that packs multiple integers to a 64-digit integer, the first 4 as selector, specifies the number and length of the integer stored in the remaining 60 digits, and the second 60 for multiple integers.Also when delta has a size greater than the maximum size of simple8b encoded (more than 1<60 - 1, which normally does not appear) no compression is made to store arrays directly.

#### Applicability

In some of the periodic data collected, assuming that data is collected every five seconds, delta is five, all timestamps can be restored by programming code using only three digits, compression is extremely high, while some delta does not guarantee consistent scenarios, i.e., smaller and less floating data when simple8b is used.

Where compression algorithms are not specified, we use this compression algorithm by default, with both compression and compression efficient.

### GORILLA

Used mainly for floating types.

#### Principles

The difference between the rationale and the classification of gorilla is that the difference is the difference between the two data, and gorilla is the difference or the difference.The first data is not processed at the time of encoding and the latter data is calculated as different from the previous data or, if the value is 0, duplicates the previous data by writing a supplement, calculates the lead zero and back zero for the difference or value delta or, if the number is the same, encoded only the middle position and 5 for the lead if the number differs, then zero for 6 and then write the intermediate valid position.

![](/img/gorilla.png)

#### Applicability

Comparisons with delta types can also be applied to time-series data scenarios, where we may collect data from different locations, but where toponymic information for data from the same location is generally consistent and where both compression and compression are efficient.

When compression algorithms are not specified, we specify this compression algorithm by default.

### QUANTILE

Used mainly for timestamps, integing, unsigned integer and float.

#### Principles

Quantile supports multiple levels of compression, CnosDB is currently using the default compression level.

Describe each data with the Hafman encoding and offset, using the Hafman code in the range [lower, upper], the offset specifies the exact location within that range.The compression for each block starts with differential treatment, replacing the current data with differential data, then dividing the current array into more than one block at approximately 128 intervals. Each block identifies a range and associated metadata, while calculating the maximum number of conventions for each block, optimizing the use of the maximum convention number as appropriate, and merging some adjacent blocks, then recoding the Hafman code according to each block in the data and using those blocks to encode the data.

![](/img/quantile.png)

#### Applicability

Comparing the delta algam with the gorilla algorithm, which also uses differential algorithms, the choice of applicable data is broadly the same, and quantile algorithms result in lower compression efficiency, with a gap of approximately 5 to 10 times, and a slightly better compression rate than delta and gorilla algorithms.

The vertical axis of the image is compressed and the time only compares relative values.

![](/img/f64_codec.png)

![](/img/i64_codec.png)

### BITPACK

Use primarily for Boolean types.

#### Principles

The size of a bool-type data is a byte, and the information expressed by bool, it really needs only one digit to indicate so that we can assemble eight bool-type data into one byte data.

#### Applicability

Any data can guarantee a compression ratio close to eight, and where compression algorithms are not specified, we will specify this compression algorithm by default.

### String Compression Algorithm

The currently supported string compression algorithm is more than the following：

![](/img/str_comrpess_ratio.png)

as well as compression time and extraction, in us

![](/img/str_compress_time.png)

#### SNPPY

Snapby algorithms are not intended to be compressed to the maximum extent and are not intended to be compatible with any other compression.Rather, it aims at very high compression efficiency and reasonable compression, and therefore recommends the use of snapmy when there is a greater need for efficiency.

We specify this compression algorithm by default without specifying a string compression algorithm.

#### ZSTs

zstd supports multiple compression ratings, CnosDB is currently using default compression rating.

Zstd is fully known as Zstandard, a fast compression algorithm that provides high compression ratios, and Zstd uses limited entropy encoders.A very powerful compression speed/compression compromise solution is provided.

#### GZIP/ZLIB

gzip is more similar to zlib. For documents to be compressed first using a variant of the LZ77 algorithm, where the results obtained were then compressed using the Huffman coded method, which has a very high but also time-consuming.Both of these algorithms are used more widely, with similar performance and can be selected according to the circumstances.

#### BZIP

Compression rates are higher compared to several other algorithms, but it is also less efficient and can be used in scenarios that require extremely high compression rates, which are generally less recommended.
