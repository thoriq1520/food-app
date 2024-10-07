pipeline {
  agent any
  environment {
    SECRET_FILE_EXPRESS = credentials("food-express-env")
    SECRET_FILE_NEST = credentials("food-nest-env")
  }
  tools {
    nodejs "NodeJS"
  }
  stages {
    stage("Create ExpressJs Service ENV"){
        steps{
          dir("express-application") {
            script {
              withCredentials([file(credentialsId: "food-express-env", variable: "SECRET_FILE_EXPRESS")]) {
                writeFile file: '.env', text: readFile(file: "${SECRET_FILE_EXPRESS}")
              }
            }
          }
        }
    }
    stage("Create NestJs Service ENV"){
      steps{
        dir("nest-application") {
          script {
            withCredentials([file(credentialsId: "food-nest-env", variable: "SECRET_FILE_NEST")]) {
              writeFile file: '.env', text: readFile(file: "${SECRET_FILE_NEST}")
            }
          }
        }
      }
    }
    stage("Create React Service ENV"){
      steps{
        dir("react-application") {
          script {
            // withCredentials([file(credentialsId: "customer-react-env", variable: "SECRET_FILE_REACT")]) {
            //   writeFile file: '.env', text: readFile(file: "${SECRET_FILE_REACT}")
            // }
          }
        }
      }
    }
    stage("Build ExpressJs and NestJs Service") {
      steps {
        parallel (
          "run express" : {
            dir("express-application") {
              bat "npm install"
              bat "node -r dotenv/config index.js"
              bat "node -r dotenv/config src/configs/db.config.js"
              bat "node index.js"
            }
          },
          "run nest": {
            dir("nest-application") {
              bat "npm install"
              bat "npm run start"
            }
          },
          "run react": {
            dir("react-application") {
              bat "npm install"
              bat "npm run dev"
            }
          }
        )
        
      }
    }
  }
}