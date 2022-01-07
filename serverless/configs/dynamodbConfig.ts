
const dynamoConfig = {
    stages: [
      "local"
    ],
    start: {
      seed: true
    },
    seed: {
      local : {
        sources: {
          table: "local-customers",
          sources: ["./seed-data.json"]
        }
      }
    },
  }

  export default dynamoConfig;