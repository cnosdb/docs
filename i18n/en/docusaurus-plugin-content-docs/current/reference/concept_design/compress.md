---
title: Compression Algorithm
order: 4
---

# Compression Algorithm

Time series data has a large scale and may contain a lot of redundancy, so compression methods are often used in time series databases to save storage space and reduce the I/O cost of query execution. Below, we will discuss the compression techniques used in CnosDB.

### DELTA

Mainly used for timestamp, integer and unsigned integer.

#### Principle

First, the difference is made, that is, the first data is unchanged, other data are transformed into delta with the previous data, and all numbers are processed byzigzag, i64 is mapped to u64, specifically to zero, negative numbers are mapped to odd numbers, such as [0, 1, 2] after zigzag processing to [0, 1,2] and maximum convention numbers are calculated. After that, check if all deltas are the same, then use run-length encoding directly, which only needs to record the first value, delta, and the number of data.Otherwise, divide all delta values by the greatest common divisor (which will also be encoded into the data), and then use simple8b for encoding.

![](/img/simple8b.png)

simple8b是一种将多个整数打包到一个64位整数的压缩算法，前4位作为selector，用于指定剩余60位中储存的整数的个数和有效位长度，后60位用于储存多个整数。另外当delta的大小超过simple8b能编码的最大范围（超过1<<60 - 1，一般情况下不会出现）则不进行压缩，直接储存数组。

#### Applicability

In some time-consuming data, assuming that data is collected every five seconds, the time stamp is 5, that all timestamps can be restored through only three numbers, with extremely high compression, while some delta does not guarantee consistent scenarios, i.e., where using Simple 8b, are more suitable for smaller, floating data.

In the absence of specifying compression algorithms, we use this compression algorithm for timemarks, integer and unsigned integers, and the compression rate is higher.

### GORILLA

Mainly used for floating point type.

#### Principle

The principle of Gorilla is similar to the difference, the difference is that the difference is the difference between two data, and gorilla is different or different. The first data is not processed at the time of coding, and if the previous data is different from the previous data, if the difference or value is 0, repeat it with the previous data, write a patch to represent repetition, and, if not zero, calculate the first zero and back derivative zeros of the heterogeneous or value delta. If the number is the same, only the intermediate valid bit is encoded. If the number is different, the first 0.5 bits are derived, the back 0. 5 bits are written, and then the intermediate valid bit is written.编码时第一个数据不进行处理，计算后一个的数据与前一个数据的异或，如果异或值为0，则与上一个数据重复，写一个补位用来表示重复，如果不为零，则计算异或值delta的前导零和后导零个数，如果个数相同，则只编码中间有效位，如果个数不同则前导零写5位，后导零写6位，然后再写中间有效位。编码时第一个数据不进行处理，计算后一个的数据与前一个数据的异或，如果异或值为0，则表示与上一个数据重复，只存储一位零。如果不为零，则计算异或值的前导零和后导零个数，如果个数相同，则存储前缀`10`加有效位数据。如果个数不同，则存储前缀`11`加5位的前导零数量和6位的后导零数量，然后存储有效位数据。

![](/img/i64_codec.png)

论文中给出的示例：

![](/img/quantile.png)

![](/img/gorilla.png)

#### Applicability

As compared with delta type, it is also suitable for time-order data scenarios, and we may collect data in different locations, but the toponymic-related information collected at the same location is generally consistent, in which the compression rate is higher than that of compression efficiency.

In the absence of specifying compression algorithms, we specify this compression algorithm for floating point type by default.

### Pco

Mainly used for timestamps, integers, unsigned integers and floating points.

#### Principle

Pco通过tANS算法对原始数据进行熵编码。tANS算法是一种现代的熵编码技术，它是ANS（Asymmetric numeral systems）的一种特定形式。tANS使用一个有限状态机，其中每个状态都对应于编码的可能结果。状态转换取决于待编码的符号，这使得它可以根据符号的概率分布进行调整。与传统的霍夫曼编码相比，tANS在处理符号概率分布不均匀的情况下可以提供更高的压缩率。tANS的具体原理可以参考这篇文章：[Streaming Asymmetric Numeral System Explained](https://graphallthethings.com/posts/streaming-ans-explained/)。Pco的存储格式可以参考这篇文档：[Pco-Format](https://github.com/mwlon/pcodec/blob/main/docs/format.md)。

#### Applicability

相比较于delta算法与gorilla算法，由于同样使用了差分算法，在适用数据的选择上大致相同，由于quantile算法采用了更复杂的编码方式，导致压缩效率比较低，大约有5到10倍的差距，相对地，压缩率则稍优于delta与gorilla算法。

500M浮点数

|           | Compression ratio     | 压缩时间                      | 解压缩时间                     |
| --------- | --------------------- | ------------------------- | ------------------------- |
| `Gorilla` | 4.50  | 13.652 µs | 70.830 ns |
| `Pco`     | 32.97 | 1.7491 s  | 9.0485 ms |

500M整数

|         | Compression ratio     | 压缩时间                      | 解压缩时间                     |
| ------- | --------------------- | ------------------------- | ------------------------- |
| `Delta` | 13.28 | 2.8366 ms | 58.428 µs |
| `Pco`   | 35.04 | 936.65 ms | 546.99 µs |

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

#### SNAPPY

Snappy algorithms are not designed to minimize compression or are not designed to be compatible with any other compression library. Instead, its goal is to be very high compression efficiency and reasonable compression rates, so it is recommended to use snappy more efficiently.相反，它的目标是非常高的压缩效率和合理的压缩率，所以在更加需要效率的情况下推荐使用snappy。相反，它的目标是非常高的压缩效率和合理的压缩率，所以在更加需要效率的情况下推荐使用snappy。

In the absence of specifying a string compression algorithm, we specify this compression algorithm by default.

#### ZSTD

Zstd supports multiple compression levels, and CnosDB currently uses the default compression level.

Zstd, known as Zstand, is a fast compression algorithm that provides high compression ratio, and Zstt uses a finite state entropy encoder. A very powerful compromise scheme for compression speed/compression rate is provided.提供了非常强大的压缩速度/压缩率的折中方案。提供了非常强大的压缩速度/压缩率的折中方案。

#### GZIP/ZLIB

Gzip is similar to zlib. For files to be compressed, a variant of the LZ77 algorithm is first used to compress the results by using Huffman coding, with high compression rate but also time-consuming. Both algorithms are widely used and have similar performances and can be selected according to the situation.这两种算法使用均比较广泛，性能相似，可以根据情况选择。这两种算法使用均比较广泛，性能相似，可以根据情况选择。

#### BZIP

Compared with several other algorithms, the compression rate is higher, but the compression efficiency is lower, which can be used for scenarios that require extreme compression rate, in general less recommended.

### Lossy Compression Algorithm

:::tip
Only Enterprise Edition supports
:::

#### SDT Compression Algorithm

Mainly used for integer, unsigned integer, floating point type.

旋转门趋势(SDT)是一种在线有损数据压缩算法，传统上用于监控和数据采集(SCADA)系统，旨在存储过程信息系统(PIMs)的历史数据。
SDT计算复杂度低，使用线性趋势来表示一定数量的数据。它最重要的参数是压缩偏差(deviation)，它表示当前样本与用于表示先前收集的数据的当前线性趋势之间的最大差异。
其原理是通过 查看当前数据点与前一个被保留的数据点所构成的 压缩偏移覆盖区来决定数据的取舍。如果偏移覆盖区可以覆盖两者之间的所有点，则不保留该数据点；如果有数据点落在压缩偏移覆盖区之外，则保留当
前数据点的前一个点，并以最新保留的数据点作为新的起点。

##### Algorithm parameters

Deviation：正浮点数。Deviation: A positive floating point number It represents the maximum difference between the current sample and the current linear trend.

#### Dead zone compression algorithm

Mainly used for integer, unsigned integer, floating point type.

The principle of the dead zone compression algorithm is: for the time series variable data, the variable change limit (namely dead zone, or threshold) is defined. If the deviation between the current data and the last stored data exceeds the specified dead zone, the current data will be saved, otherwise the current data will be discarded. This algorithm only needs to compare the continuous data from the time series with the previous saved data to determine whether the data needs to be saved. Because of this, it is easy to understand and implement, and most real-time databases with lossy compression provide this compression method.Deviation: A positive floating point number The absolute or relative value of the allowable deviation when using the algorithm, based on the last saved number. It determines the compression rate of the algorithm and the accuracy of the compressed data.不同时序数据库的具体存储结构与压缩算法在设计上相差很大。

##### Algorithm parameters

Deviation: 正浮点数。使用该算法时允许偏差的绝对值或相对值，以最后一个已保存的数为基准。它决定了算法的压缩率，以及压缩后数据的精确度。
