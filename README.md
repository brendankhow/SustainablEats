# wad2_g6t08_2 WAD2 Project :wave: SustainablEats 

## Table of Contents
* [Group Members]
* [IMPORTANT NOTES]
* [Project Overview]
* [Installation Guide]
    * [Project Set up]
    * [Local set up]
    * [Firebase set up]
    * [Online Hosting]
* [Project resources]
    * [Figma] (#figma)
    * [database diagram] (#database)
    * [Creative Content] (#creative_content)
    * [Proposal]
    * [Demo Slides]
* [Demo Video]
* API References


## Project setup
```
npm install openai
npm install axios
npm install bootstrap-icons
npm install canvas-confetti

In case the AI does not work, it could be due to the lack of credits for the AI. <br>
Please go to the chatgpt.vue file and change the const OPENAI_API_KEY and replaced it as yours. <br>
Else, contact one of the team members. 

Note that since we are using ChatGPT API for recipe generation and image generation, there will be latency and events where the bandwidth for firebase has run out.

```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### API References
* See [OpenAI Image Generation API](https://platform.openai.com/docs/api-reference/images)
* See [OpenAI Chat Completions API](https://platform.openai.com/docs/api-reference/completions)
