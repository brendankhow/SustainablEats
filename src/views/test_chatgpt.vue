<template>

</template>

<script>
import axios from 'axios';
const OPENAI_API_KEY = "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"; 

axios.post('https://api.openai.com/v1/engines/davinci/completions', 
{ 
    'prompt': `You are a friendly AI that is meant to help provide recipes for people based on their 
    ingredients and preference from the list below. 
     ${ingredients} and ${preferences}
     
     You are to send the response back in the following format: 
     <ul id="ingredients">
        <li>Ingredients</li>
    </ul>

    <ul id="steps">
        <li>Steps/ Instructions</li>
    </ul>
     `,
    'max_tokens': 60 
}, 
{ 
    headers: { 
    'Authorization': `Bearer ${OPENAI_API_KEY}`, 
    'Content-Type': 'application/json' 
    } 
}
)
.then(response => { 
    console.log(response.data.choices[0].text.trim()); 
})
.catch(error => { 
    console.error(error); 
}); 

</script>