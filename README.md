# wad2_g6t08_2 WAD2 Project :wave: SustainablEats
* ![./src/assets/sustainablEats.png]
* Access our website through this link (https://sustainableats-sg.web.app/)
* Youtube Demo Link: https://youtu.be/-8ciSRxvlqI

## Table of Contents
* <a href="#group-member">Group Members</a>
* <a href="#important-notes">IMPORTANT NOTES</a>
* <a href="#project-overview">Project Overview</a>
* <a href="#installation-guide">Installation Guide</a>
    * <a href="#project">Project</a>
    * <a href="#local">Local</a>
    * <a href="#firebase">Firebase</a>
    * <a href="#online">Online</a>
* <a href="#project-resources">Project Resources</a>
    * <a href="#figma">Figma</a>
    * <a href="#database">Database</a>
    * <a href="#creative_content">Creative Content</a>
    * <a href="#proposal">Proposal</a>
    * <a href="#demo-slides">Demo Slides</a>
* <a href="#demo-video">Demo Video</a>
* <a href="#api">API</a>


## Group Members
--------------------------------------------------------------------------
| Name                | Student ID | Email                               |
|---------------------|------------|-------------------------------------|
| Cheryl Toh Wen Qi   | 01460616   | cheryl.toh.2022@scis.smu.edu.sg     |
| Brendan Khow Bo Ren | 01415987   | brendankhow.2022@scis.smu.edu.sg    |
| Yeo Jun Wei         | 01422582   | junwei.yeo.2022@scis.smu.edu.sg     |
--------------------------------------------------------------------------

## Important Notes
* Due to the current limitations with the chatgpt API, users would have to upload photo themselves (for the recipe generation). 
* Additionally, due to the nature of large amount of bandwidth the API uses and the limitations of free firebase plan, the websites have limited bandwidth = images not loading. 
* When this occur, please kindly wait for 24 hours such that the bandwidth resets. We seek your understanding and cooperation. Thank You!

## Installation Guide

### Project Set up

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

### Local Set Up

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
<a href="https://www.figma.com/file/lwtD6C8nPcV4P3PK1pkRwD/Lo-fi-Prototype?type=design&node-id=0%3A1&mode=design&t=3PDBj1NzA5rBTdgi-1">Figma Prototype</a>

## Proposal
<a href="https://docs.google.com/document/d/1xFmi8v4FXeQ_lN7CaHvldTWBmzCTYkXLgaCHvdxvmE4/edit?usp=sharing">Figma Proposal Document</a>

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## APIs
* See [OpenAI Image Generation API](https://platform.openai.com/docs/api-reference/images)
* See [OpenAI Chat Completions API](https://platform.openai.com/docs/api-reference/completions)
