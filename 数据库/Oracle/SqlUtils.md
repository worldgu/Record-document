##  可能会用到的sql集合

### 某个时间段的数据

```sql
-- 查询最近一周12:30分到13:00这段时间内的订单量：
SELECT *
  FROM T_ORDER O
 WHERE O.CREATEDATETIME BETWEEN
       SYSDATE-7 AND
       SYSDATE
   AND TO_CHAR(O.CREATEDATETIME, 'hh24:mi:ss') BETWEEN '12:30:00' AND
       '13:00:00'
       
--  查询某段日期内某个时间段的订单量：
SELECT *
  FROM T_ORDER O
 WHERE O.CREATEDATETIME BETWEEN
       TO_DATE('2016-10-08 12:30', 'yyyy-mm-dd hh24:mi') AND
       TO_DATE('2016-10-14 13:00', 'yyyy-mm-dd hh24:mi')
   AND TO_CHAR(O.CREATEDATETIME, 'hh24:mi:ss') BETWEEN '12:30:00' AND
       '13:00:00'
```

### 通过出生日期计算年龄

```sql
--  方法一
SELECT TRUNC(months_between(sysdate, birth)/12) AS age
from mytable

--  方法二
select TRUNC((to_char(sysdate, 'yyyyMMdd') - to_char(birth, 'yyyyMMdd')) /
             10000) as age
from mytable

--  注：sysdate 为系统日期时间，birth 为表中出生日期字段
```

