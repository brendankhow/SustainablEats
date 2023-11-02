<template>
  <!-- You can use your data and methods in your template -->
</template>

<script>
import axios from 'axios';

export default {
data() {
  return {
    //no naughty take my api key ok: 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
    OPENAI_API_KEY: "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",
  };
},
methods: {
  translate() {
    axios.post('https://api.openai.com/v1/chat/completions', 
    { 
        'model': 'gpt-3.5-turbo',
        'messages': [
            {
                'role': 'system',
                'content': 'You are a helpful assistant.'
            },
            {
                'role': 'user',
                'content': 'create a recipe using eggs and flour only'
            }
        ]
    }, 
    { 
        headers: { 
        'Authorization': `Bearer ${this.OPENAI_API_KEY}`, 
        'Content-Type': 'application/json' 
        } 
    }
    )
    .then(response => { 
        console.log(response.data.choices[0].message.content.trim()); 
    })
    .catch(error => { 
        console.error(""); 
    }); 
  }
},
created() {
  this.translate();
}
};
</script>