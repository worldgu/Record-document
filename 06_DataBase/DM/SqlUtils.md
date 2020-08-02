## DM数据库Sql记录

### 删除数据库的锁

``` sql
-- 查看什么被锁锁住了


select a.*,b.name,c.sess_id 
from v$lock a 
left join sysobjects b on b.id=a.table_id 
left join v$sessions c on a.TRX_ID = c.TRX_ID


-- 使用系统函数，干掉对应会话
sp_close_session('140454161628664')
```

