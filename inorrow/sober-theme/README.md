# Sober Theme

[![npm version](https://badge.fury.io/js/sober.svg)](https://badge.fury.io/js/sober)


Sober-Theme 是 Sober 的主题生成器。   

# 安装 Installation
```shell
npm install sober-theme
```

# CDN

```html
<script src="https://unpkg.com/sober-theme/dist/sober-theme.min.js"></script>
<script>
  sober.theme.createScheme('#009688', { page: document.querySelector('s-page') })
</script>
```

# 使用 Usage

```js
import { createScheme } from 'sober-theme'

const theme = createScheme('#009688', { page: document.querySelector('s-page') })
console.log(theme)
```

# 文档 Documentation

在 [soberjs.com](https://soberjs.com) 上查看 **Sober** 的完整文档。   

See Sober's full documentation on [soberjs.com](https://soberjs.com)