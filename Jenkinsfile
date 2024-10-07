pipeline {
    agent any
    tools {
        nodejs "NodeJS" // Make sure NodeJS is installed in Jenkins
    }
    stages {
        stage("Install and Build Services") {
            steps {
                parallel (
                    "Run Express": {
                        dir("express-application") {
                            sh "npm install"
                            sh "npm run start"
                        }
                    },
                    "Run Nest": {
                        dir("nest-application") {
                            sh "npm install"
                            sh "npm run start"
                        }
                    },
                    "Run React": {
                        dir("react-application") {
                            sh "npm install"
                            sh "npm run dev"
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
