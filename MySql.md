# SQL

## MySQL 存储引擎

### InnoDB

- MySQL5.5 后默认的存储引擎，在事务上具备优势，支持具有提交、回滚和崩溃恢复能力的事务安装，比MyISAM存储引擎占用更多的磁盘空间。
- 如果应对事务的完整性有比较高的要求，在并发条件下要求数据的一致性，数据操作除了插入和查询意外，还包括很多的更新删除操作，选择InnoDB。
- InnoDB除了可以有效地降低由于删除更新导致的锁定，还可以确保事务的完整提交和回滚，对于类似于计费系统或者财务系统等对数据准确要求比较高的系统

### MyISAM

- MySQL 5.1版本及之前的版本，MyISAM是默认的存储引擎
- 不支持事务和外键，访问速度比较快。如果应用主要以读取和写入为主，只有少量的更新删除操作，对事务的完整性、并发性要求不是很高，选择MyISAM
- MyISAM是在web数据仓储和其他应用环境下最常使用的存储引擎之一

### MEMORY

- 存储引擎将所有数据保存在 RAM 中，所以该存储引擎的数据访问速度快，但是安全上没有保障
- MEMORY 对表的大小有限制，太大的表无法缓存在内存中。由于使用 MEMORY 存储引擎没有安全保障，所以要确保数据库异常终止后表中的数据可以恢复。
- 如果应用中涉及数据比较少，且需要进行快速访问，则适合使用 MEMORY 存储引擎。

<table><tbody>
  <tr>
    <th>存储引擎</th><th>描述</th>
  </tr>
  <tr>
    <td>InnoDB</td>
    <td>具备外键支持功能的事务处理引擎</td>
  </tr>
  <tr>
    <td>MyISAM</td>
    <td>主要的非事务处理存储引擎</td>
  </tr>
  <tr>
    <td>ARCHIVE</td>
    <td>用于数据存档的引擎，数据被插入后就不能再修改了，且不支持索引</td>
  </tr>
  <tr>
    <td>MEMORY</td>
    <td>置于内存的表</td>
  </tr>
  <tr>
    <td>NDB</td>
    <td>MySQL集群专用存储引擎</td>
  </tr>
  <tr>
    <td>CSV</td>
    <td>在存储数据时，会以逗号作为数据项之间的分隔符</td>
  </tr>
  <tr>
    <td>MERGE</td>
    <td>用来管理多个MyISAM表构成的表集合</td>
  </tr>
  <tr>
    <td>BLACKHOLE</td>
    <td>会丢弃写操作，该操作会返回空内容。</td>
  </tr>
  <tr>
    <td>FEDERATED</td>
    <td>将数据存储在远程数据库中，用来访问远程表的存储引擎。</td>
  </tr>
</table>

## MySQL 约束

### 主键约束

主键约束是使用最频繁的约束。在设计数据表时，一般情况下，都会要求表中设置一个主键（PRIMARY KEY）；

### 外键约束

外键约束经常和主键约束一起使用，用来确保数据的一致性；

定义外键时，需要遵守以下规则

- 主表必须已经存在于数据库中，或者是当前正在创建的表。如果是后一种情况，则主表与从表是同一个表，这样的表成为自参照表，这种结构成为自参照完整性；
- 必须为主表定义外键
- 主键不能包含空值，但允许在外键中出现的空值，也就是说：只要外键的每个非空值出现在指定的主键中，这个外键的内容就是正确的
- 在主表的表名后面指定列名或列名的组合。这个列或列的组合必须是主表的主键或候选键。
- 外键中列的数目必须和主表的主键中列的数目相同。
- 外键中列的数据类型必须和主表主键中对应列的数据类型相同。

语法

```mysql
[CONSTRAINT <外键名>] FOREIGN KEY 字段名 [，字段名2，…]
REFERENCES <主表名> 主键列1 [，主键列2，…]
```

### 唯一约束

唯一约束和主键约束有一个相似的地方，就是能够确保列的唯一性。与主键约束不同的是：唯一约束在一个表中可以有多个，并且设置唯一约束的列是允许有空值的，虽然只能有一个空值；

### 检查约束

检查约束是用来检查数据表中，字段值是否有效的一个手段；

### 非空约束

非空约束用来约束表中的字段不能为空；

### 默认值约束

默认值约束用来约束当数据表的某个字段不输入值时，自动为其添加一个已经设置好的值；