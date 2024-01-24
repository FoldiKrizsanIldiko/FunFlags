<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

![Contributors](https://img.shields.io/badge/-_Contributors-red.svg?logo=github&style=for-the-badge)

[![Imre Stumpf](https://img.shields.io/badge/Imre%20Stumpf-blue.svg?logo=github)][contributor1-url]
[![Balázs Oltvolgyi](https://img.shields.io/badge/Bal%C3%A1zs%20Olv%C3%B6lgyi-blue.svg?logo=github)][contributor2-url]
[![Földi Krizsán Ildikó](https://img.shields.io/badge/F%C3%B6ldi%20Krizs%C3%A1n%20Ildik%C3%B3-blue.svg?logo=github)][contributor3-url]

![LinkedIn][linkedin-shield]

[![Imre Stumpf](https://img.shields.io/badge/-_Imre%20Stumpf-grey.svg?logo=linkedin&colorB=555)][linkedin1-url]
[![Balázs Oltvolgyi](https://img.shields.io/badge/-_Bal%C3%A1zs%20Olv%C3%B6lgyi-grey.svg?logo=linkedin&colorB=555)][linkedin2-url]
[![Static Badge](https://img.shields.io/badge/-_%20F%C3%B6ldi%20Krizs%C3%A1n%20Ildik%C3%B3-grey.svg?logo=linkedin&colorB=555)][linkedin3-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/FoldiKrizsanIldiko/FunFlags">
    <img src="../client/public/favicon.png" alt="Logo" width="80" height="80">
  </a>
</div>

<h3 align="center">Fun with Flags</h3>


### Built With

- [![React][React.js]][React-url]  
- [![Express][Express.io]][Express-url]  
- [![MongoDB][MongoDB.io]][MongoDb-url]  
- [![AWSlambda][AWSLambda.io]][AWSLambda-url]  

<p align="right">(<a href="#readme-top">back to top</a>)</p>



# Steps of deploying the server to AWS Lambda with serverless framework

<p style="text-align:left;">

To build a serverless function, I start by installing the Serverless module globally using the following command:
```
npm install -g serverless
```

Now, I can leverage Serverless templates. I've chosen the aws-node-http-api-mongodb template since it aligns with my use of the HTTP API Gateway and MongoDB database. Although the template isn't an exact fit for my needs, it provides an excellent starting point. I initiate the project with the following command: 
```
serverless create -u https://github.com/serverless/examples/tree/v3/aws-node-http-api-mongodb
```
I navigate into the newly created folder:
 ```
cd .\aws-node-http-api-mongodb\
 ```
In the package.json file, I adjust dependencies and devDependencies as necessary. Additionally, I ensure that the Mongoose version is up to date.

I replace the template's model/User.js with my original User.js file. The handler.js file is also modified to include my MongoDB connection string.

Within the serverless.yaml file, I add my AWS profile and location. This allows me to connect to my AWS account through the CLI. The AWS connection setup is necessary. I use a .env file to locally store my MongoDB connection string, ensuring it is excluded from uploading to the Lambda function. It's a good practice to add .env to the .gitignore file as well.

Next, I install the required npm packages:

```
npm i
```
Finally, I deploy the files:
```
serverless deploy 
```
This command generates the .serverless file. I then check AWS to confirm the creation of my Lambda functions along with the HTTP API Gateway. The endpoints for my functions can be viewed in the console.


<!-- CONTACT -->

## Contact

<!-- Földi Krizsán Ildikó  - fkildiko@yahoo.com -->

Project Link: [https://github.com/FoldiKrizsanIldiko/FunFlags](https://github.com/FoldiKrizsanIldiko/FunFlags)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributor1-url]: https://github.com/Surmi64
[contributor2-url]: https://github.com/balazs-oltvolgyi
[contributor3-url]: https://github.com/FoldiKrizsanIldiko
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/FoldiKrizsanIldiko/FunFlags/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/FoldiKrizsanIldiko/FunFlags/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/FoldiKrizsanIldiko/FunFlags/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/FoldiKrizsanIldiko/FunFlags/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin1-url]: https://www.linkedin.com/in/istumpf/
[linkedin2-url]: https://www.linkedin.com/in/balazs-o/
[linkedin3-url]: https://www.linkedin.com/in/ildiko-foldi-krizsan/
[product-screenshot]: client/public/scrsh1.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.io]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=Express&logoColor=47A248
[Express-url]: https://expressjs.com/
[MongoDB.io]: https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=MongoDB&logoColor=47A248
[MongoDb-url]: https://www.mongodb.com/atlas/database
[AWSLambda.io]: https://img.shields.io/badge/Lambda-20232A?style=for-the-badge&logo=AWSLambda&logoColor=FF9900
[AWSLambda-url]: https://aws.amazon.com/pm/lambda/?gclid=CjwKCAiA1-6sBhAoEiwArqlGPuZDskT0wZIcIb3EISWuN_425YQqAIuiPF_OFZg6mHAQzxswLGZ66hoCEx4QAvD_BwE&trk=5e541ab3-2fcc-4151-9e08-fdea53dc7fb8&sc_channel=ps&ef_id=CjwKCAiA1-6sBhAoEiwArqlGPuZDskT0wZIcIb3EISWuN_425YQqAIuiPF_OFZg6mHAQzxswLGZ66hoCEx4QAvD_BwE:G:s&s_kwcid=AL!4422!3!651541907473!e!!g!!aws%20lambda!19836375769!150670855801
