# :wave: WAD2 Project SustainablEats

<div align="center">
    <img src="/src/assets/sustainablEats.png" alt="SustainablEats logo">
</div>

* Access our website through this link (https://sustainableats-sg.web.app/)
* Youtube Demo Link: https://youtu.be/-8ciSRxvlqI

## Table of Contents
- [Group Members](#group-members)
- [Contributions](#contributions)
- [Important Notes](#important-notes)
- [Project Overview](#project-overview)
   - [Features](#features)
- [Installation Guide](#installation-guide)
   - [Project Setup](#project-setup)
   - [Local Setup](#local-setup)
   - [Google Firebase Setup](#google-firebase-setup)
   - [Online Hosting](#online-hosting)
   - [Dependencies & Libraries Installation](#dependencies--libraries-installation)
   - [OpenAI Set Up](#openai-set-up)
- [United Nations Sustainable Development Goals](#united-nations-sustainable-development-goals)
- [Test-Users Account](#test-users-account)
- [Other Project Resources](#other-project-resources)
   - [Figma](#figma)
   - [API](#apis)
   - [Firebase](#firebase)
- [Proposal](#proposal)
   - [Report](#report)
   - [Demo Slides](#demo-slides)
   - [Demo Video](#demo-video)
- [Customize Configuration](#customize-configuration)
- [Additional Images / Default Images](#additional-images--default-images)


## Group Members

------------------------------------------------------------------------------
| Name                  | Student ID | Email                                 |
|-----------------------|------------|---------------------------------------|
| Cheryl Toh Wen Qi     | 01460616   | cheryl.toh.2022@scis.smu.edu.sg       |
| Brendan Khow Bo Ren   | 01415987   | brendankhow.2022@scis.smu.edu.sg      |
| Yeo Jun Wei           | 01422582   | junwei.yeo.2022@scis.smu.edu.sg       |
| William Tan Juin Wei  | 01384208   | william.tan.2022@scis.smu.edu.sg      |
------------------------------------------------------------------------------

## Contributions

| **Contributor** | **Tasks**                                             |
|-----------------|--------------------------------------------------------|
| Cheryl          | Register, Sign In, Update, Delete, Profile Setting, Navigation Bar, Home Page, ChatGPT API, Generate Recipe and Images, Styling and Overall UI, Figma |
| Brendan         | Register, Sign In, Create, Retrieve, Update, Delete Recipe, Navigation Bar, Footer, Styling and Overall UI, Install And Setup Vue Js In Visual Studio Code, GitHub Setup, Firebase Deployment, Figma |
| Jun Wei         | Register, Sign In, Trending Recipe Carousell, Review Function, Like and Bookmark Recipe Function, Coins and Leaderboard Function, Styling and Overall UI, Figma |
| William         | Loading Buffer Animation, AI Response Formatting, Figma |

## Important Notes

* Due to the current limitations with the chatgpt API, users would have to upload photo themselves (for the recipe generation). 
* Additionally, due to the nature of large amount of bandwidth the API uses and the limitations of free firebase plan, the websites have limited bandwidth = images not loading. 
* When this occur, please kindly wait for 24 hours such that the bandwidth resets. We seek your understanding and cooperation. Thank You!

## Project Overview

According to the National Environment Agency (NEA), the amount of food waste generated in 2022 was an astonishing 813,000 tonnes (NEA, 2023).

With Singapore’s rising focus on tackling sustainability problems, the primary goal of SustainablEats is to empower individuals and build a positive community to make sustainable food choices and reduce wastage.

This application serves as a platform to facilitate the exchange of recipes and ideas among users while promoting sustainable food choices through AI-generated food recipes. We aim to achieve this through the following key components:

### Features 

1. **Recipe Generator:**
   - SustainablEats will feature an AI-powered recipe generator with image generation capabilities that accounts for users’ tastes and preferences based on the user’s input of ingredients. Our website aims to encourage users to make use of soon-to-be-expired food or extra food as part of their recipes and meals to help reduce wastage and responsible consumption.

2. **Social Platform:**
   - Our web application will also have a social space that allows users to share recipes that they like. Other users will be able to view the recipes and give comments/reviews. This is to help encourage and build an wholesame community

3. **Profile Customization:**
   - Users will be able create, read, update and delete their own profile. This includes customization such as profile picture, profile banners etc.

4. **Bookmark & Likes**
   - Users are able to bookmark their favourite recipes (which includes deleteing it) and even like other people recipes!
   - For every 5 likes, users gain 1 coin :)
---

## Installation Guide

### Project Setup

1. **Install Node.js:**
   - Visit [http://node.js.org/en](http://node.js.org/en) and install the recommended version of Node.js for most users onto your computer.

2. **Install Vue CLI:**
   - Complete the Node.js setup.
   - Visit [https://vuejs.org](https://vuejs.org) to install Vue CLI.

3. **Install Vue CLI globally:**
   - Open the command prompt.
   - Run the following command to install Vue CLI globally:
     ```bash
     npm install -g @vue/cli
     ```

4. **Create a new Vue project:**
   - In the command prompt, navigate to the directory where you want to create your project.
   - Run the following command to create a new Vue project (replace "my-vue-app" with your desired project name):
     ```bash
     vue create my-vue-app
     ```

5. **Serve your Vue app:**
   - Navigate to your project directory.
   - Run the following command to serve your app on the URLs that will be generated:
     ```bash
     npm run serve
     ```

### Local SetUp

1. **Clone the Repository:**
   - Replicate the web application source files locally by cloning the GitHub repository.
     ```bash
     git clone [repository_url]
     ```

2. **Serve the Application:**
   - Type the following command into the terminal to launch the website using the link in localhost/network:
     ```bash
     npm run serve
     ```

Now, you should be able to access and interact with the website locally.

### Google Firebase Setup

1. **Login to [Google Firebase Console](https://console.firebase.google.com/) with your Google account.**
   
2. **Create a New Project:**
   - Add a new project with a name of your choice.

3. **Enable Google Analytics:**
   - Enable **Google Analytics** for your project for advanced metric collection.

4. **Add a New Web Application:**
   - Register a new web application.
   - Choose the **Use npm** option and continue to the console.

5. **Set up Storage:**
   - From the left-side bar, click on **Build**, then select **Storage**.
   - Click on **Get started**.

6. **Configure Sign-in Method:**
   - Select the Sign-in method you would like to use for your project.

7. **Set up Firestore Database:**
   - From the left-side bar, click on **Firestore Database**.
   - Click on **Create Database**.
   - Select the location of your choice and set the secure rules according to your security needs (modifiable later).
   - Click **Enable**.

8. **Configure Storage:**
   - Again, select **Storage** from the left-side bar.
   - Click on **Get started**.
   - Set the secure rules according to your security needs (modifiable later).
   - Choose the location (preferably the same as Firestore Database).

9. **Retrieve Firebase Configuration:**
   - Under Project settings, navigate to the **General** tab.
   - Select **Config** and copy the Firebase configuration code.

10. **Integrate Firebase in Your Project:**
    - Paste the copied code inside **main.js** in your project.

Now, your project is set up with Google Firebase. You can utilize the Firestore Database and Storage services for your application.

### Online Hosting

1. **Install Firebase Tools:**
   - Open the Terminal in Visual Studio Code and run the following command to install Firebase Tools globally:
     ```bash
     npm install -g firebase-tools
     ```

2. **Configure Your Project:**
   - Run the following command to build your project, creating a `dist` folder with everything needed for deployment:
     ```bash
     npm run build
     ```

3. **Create Firebase Configuration Files:**
   - Within the root folder, create a new file called `.firebaserc` with the following content:
     ```json
     {
       "projects": {
         "default": "your-firebase-project-id"
       }
     }
     ```
     (Replace "your-firebase-project-id" with your project ID value)

   - Create another file called `firebase.json` within the root folder with the following content:

     ```json
     {
       "hosting": {
         "public": "dist",
         "ignore": [
           "firebase.json",
           "**/.*",
           "**/node_modules/**"
         ],
         "rewrites": [
           {
             "source": "**",
             "destination": "/index.html"
           }
         ]
       }
     }
     ```

4. **Deploy Your Application:**
   - Connect to your local machine by running the following command:
     ```bash
     firebase login
     ```
   
   - Once you are successfully logged in, run the following command to deploy your project:
     ```bash
     firebase deploy
     ```

Now, your application should be successfully deployed. Access the provided URL to view your hosted project.

### Dependencies & Libraries Installation

To set up the necessary dependencies and libraries for your project, run the following commands:

```bash
npm install openai
npm install axios
npm install bootstrap-icons
npm install canvas-confetti
npm install -g firebase-tools
npm install -g @vue/cli
```

### OpenAI Set Up
* In order for the website chatgpt AI work, you would need to go to the OpenAI website to create a key for it to work. 
* Please go to the GenerateRecipe.vue file and replace the value for OPENAI_API_KEY
* Else, contact one of the team members. 


## United Nations Sustainable Development Goals

| SDG     | Goal Title                                 | Description                                                                                                      |
|---------|--------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| SDG 2   | Zero Hunger                               | SustainablEats aims to encourage users to share and try out sustainable recipes in their daily lives. Utilizing sustainable recipes with soon-to-expire ingredients reduces food wastage, providing more food for those in need. |
| SDG 11  | Sustainable Cities and Communities         | Sustainable recipes emphasize using all parts of ingredients, minimizing waste. This practice reduces food waste in cities, conserving resources and making cities more sustainable.           |
| SDG 12  | Responsible Consumption and Production      | Sustainable recipes promote the use of environmentally friendly ingredients, such as organic and locally sourced produce. This encourages responsible sourcing and production, reducing negative environmental impacts. |
| SDG 13  | Climate Action                            | Food waste is a significant contributor to greenhouse gas emissions. By sharing sustainable recipes, SustainablEats helps reduce food waste, lowering methane emissions in landfills and supporting climate action.      |



## Test-Users Account

| User  | Username            | Password          |
|-------|---------------------|-------------------|
| User #1 | mokkie@gmail.com    | 111111Qq          |
| User #2 | jason@gmail.com     | 111111Qq          |

## Other Project Resources

### Figma
1. [Figma Prototype](https://www.figma.com/file/lwtD6C8nPcV4P3PK1pkRwD/Lo-fi-Prototype?type=design&node-id=0%3A1&mode=design&t=3PDBj1NzA5rBTdgi-1)

### APIs
1. See [OpenAI Image Generation API](https://platform.openai.com/docs/api-reference/images)
2. See [OpenAI Chat Completions API](https://platform.openai.com/docs/api-reference/completions)

### Firebase
1. [Firebase Database](https://console.firebase.google.com/project/sustainableats-sg/overview)

## Proposal
1. [Proposal Report Document](https://docs.google.com/document/d/1xFmi8v4FXeQ_lN7CaHvldTWBmzCTYkXLgaCHvdxvmE4/edit?usp=sharing)

2. [Demo Slides](https://docs.google.com/presentation/d/1cEeYnk5VX3-hQdV7k78Pezl2Yo5Rs8K7MHIO-cOuAOw/edit#slide=id.g2994d8d0b45_0_117)

3. [Demo Video](https://youtu.be/-8ciSRxvlqI)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Additional Images / Default images
<div align="center">
    <img src="/src/assets/sustainablEats.png" alt="SustainablEats logo">
    <img src="/src/assets/default.png">
    <img src="/src/assets/pp_default.jpg">
    <img src="/src/assets/default_banner.jpg">
</div>


