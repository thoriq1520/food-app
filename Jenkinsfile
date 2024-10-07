pipeline {
    agent any
    environment {
        SECRET_FILE_EXPRESS = credentials("food-express-env")
        SECRET_FILE_NEST = credentials("food-nest-env")
    }
    tools {
        nodejs "NodeJS" // Pastikan Anda memiliki NodeJS terinstall di Jenkins
    }
    stages {
        stage("Create ExpressJs Service ENV") {
            steps {
                dir("express-application") { 
                    script {
                        withCredentials([file(credentialsId: "food-express-env", variable: "SECRET_FILE_EXPRESS")]) {
                            writeFile file: '.env', text: readFile(SECRET_FILE_EXPRESS)
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
                            writeFile file: '.env', text: readFile(SECRET_FILE_NEST)
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
                            bat "npm install"
                            bat "npm run start"
                        }
                    },
                    "Run Nest": {
                        dir("nest-application") {
                            bat "npm install"
                            bat "npm run start"
                        }
                    },
                    "Run React": {
                        dir("react-application") {
                            bat "npm install"
                            bat "npm run dev"
                        }
                    }
                )
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
            cleanWs() // Membersihkan workspace setelah build
        }
    }
}
