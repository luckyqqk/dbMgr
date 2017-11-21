# dbMgr
mysql query sql mgr use generic-pool

### 设计目的
项目中需要执行的sql是有峰值的,某希望在峰值时,不会对mysql的通道造成破坏性伤害.

### 目前支持
仅支持连接池直连数据库.

### 依赖
```
"generic-pool":"2.0.4",
"mysql":"2.14.1"
```
### 后续目标
将需要执行sql的情景缓存,定时更新(加入批量更新)到数据库.
