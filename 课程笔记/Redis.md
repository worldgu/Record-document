## Redis

### 20200313

通过Spring Boot连接Redis

####  安全策略

```shell
# 连接Redis 执行
CONFIG GET *    # 获取所有配置
##  将 protected-mode  设置为no  本参数默认为禁止远端访问的  默认值为 yes
CONFIIG SET protected-mode no  # 临时更改

```



#### redis0将对象放入Hash

```java
@Autowired
ObjectMapper objectMapper;

@Autowired
RedisTemplate  stringRedisTemplate;  // 这种方式会有一个序列化的问题

@Autowired
StringRedisTemplate  stringRedisTemplate;  // 这种方式会有一个数字类型住转换的问题

//  定义Person 对象
Person person = new Person();

// 设置高阶的 hash的序列化化 的方式,解决上述的 数字类型转换问题
stringRedisTemplate.setHashValueSerializer(new Jackson2JsonRedisSeriallaer<Object>(Object.class));


// 参数为false是扁平化
Jackson2HashMapper jm = new Jackson2HashMapper(objectMapper,false); 

// 将对象放入Hash
stringRedisTemplate.opsForHash().putAll("sean01",jm.toHash(person));

// 将对象从Hash中取出来
Map map = stringRedisTemplate.opsForHash().entries("sean01");

// 将Map转换为对象
Person person = objectMapper.converValue(map, Person.class);


```













