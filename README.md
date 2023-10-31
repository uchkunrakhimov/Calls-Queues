### Run on local machine

```bash
npm update && \
npm run dev
```

### Run on server

```bash
npm update && \
npm i -g pm2 typescript && \
tsc && \
pm2 start ./src/index.js
```

### Requirements

- **node > 18**
- **npm > 9**

**The frontend part is located in the [client](https://github.com/uchkunrakhimov/calls-queues/tree/client) branch.**
