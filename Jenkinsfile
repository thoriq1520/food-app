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
                dir("express-application") { // Menunjuk ke direktori Express
                    script {
                        withCredentials([file(credentialsId: "food-express-env", variable: "SECRET_FILE_EXPRESS")]) {
                            writeFile file: '.env', text: readFile(SECRET_FILE_EXPRESS) // gunakan langsung nama variabel
                        }
                    }
                }
            }
        }
        stage("Create NestJs Service ENV") {
            steps {
                dir("nest-application") { // Menunjuk ke direktori Nest
                    script {
                        withCredentials([file(credentialsId: "food-nest-env", variable: "SECRET_FILE_NEST")]) {
                            writeFile file: '.env', text: readFile(SECRET_FILE_NEST) // gunakan langsung nama variabel
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
                            bat "npm install" || error("npm install failed for Express")
                            bat "npm run start" || error("npm run start failed for Express")
                        }
                    },
                    "Run Nest": {
                        dir("nest-application") {
                            bat "npm install" || error("npm install failed for Nest")
                            bat "npm run build" || error("npm run build failed for Nest")
                            bat "npm run start" || error("npm run start failed for Nest")
                        }
                    },
                    "Run React": {
                        dir("react-application") {
                            bat "npm install" || error("npm install failed for React")
                            bat "npm run build" || error("npm run build failed for React")
                            bat "npm run start" || error("npm run start failed for React")
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
