pipeline {
    agent any
    environment {
        SECRET_FILE_EXPRESS = credentials("food-express-env") // Express environment credentials
        SECRET_FILE_NEST = credentials("food-nest-env")       // Nest environment credentials
    }
    tools {
        nodejs "NodeJS" // Ensure NodeJS is installed in Jenkins
    }
    stages {
        stage("Create ExpressJs Service ENV") {
            steps {
                dir("express-application") {
                    script {
                        withCredentials([file(credentialsId: "food-express-env", variable: "SECRET_FILE_EXPRESS")]) {
                            writeFile file: '.env', text: readFile(SECRET_FILE_EXPRESS) // Write Express .env file from credentials
                        }
                    }
                }
            }
        }
        stage("Create NestJs Service ENV") {
            steps {
                dir("nest-application") {
                    script {
                        withCredentials([file(credentialsId: "food-nest-env", variable: "SECRET_FILE_NEST")]) {
                            writeFile file: '.env', text: readFile(SECRET_FILE_NEST) // Write Nest .env file from credentials
                        }
                    }
                }
            }
        }
        stage("Install and Build Services") {
            steps {
                parallel (
                    "Run Express": {
                        dir("express-application") {
                            sh "npm install"                           // Install dependencies for Express
                            sh "node -r dotenv/config index.js"       // Run Express app with dotenv config
                            sh "node -r dotenv/config src/configs/db.config.js" // Run db config with dotenv for Express
                        }
                    },
                    "Run Nest": {
                        dir("nest-application") {
                            sh "npm install"                           // Install dependencies for Nest
                            sh "npm run start"                         // Run Nest app
                        }
                    },
                    "Run React": {
                        dir("react-application") {
                            sh "npm install"                           // Install dependencies for React
                            sh "npm run dev"                           // Run React app in development mode
                        }
                    }
                )
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
            cleanWs() // Clean up workspace after build
        }
    }
}
