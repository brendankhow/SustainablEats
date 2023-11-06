<template>
    <div>
      <input v-model="prompt" type="text" placeholder="Enter a prompt" />
      <button @click="generateImage">Generate Image</button>
      <img v-if="imageUrl" :src="imageUrl" />
    </div>
  </template>
  
    <script>
    import axios from "axios";

    export default {
    data() {
    return {
        OPENAI_API_KEY: "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", //will key
        prompt: "",
        imageUrl: "",
    };
    },
    methods: {
        async generateImage() {
            const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
            
                prompt: this.prompt,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.OPENAI_API_KEY}`,
                },
            }
            );
            this.imageUrl = response.data.data[0].url;
        },
    },
};
</script>