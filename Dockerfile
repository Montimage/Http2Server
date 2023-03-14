# Use an official image as the base image
FROM node:19.4.0

# Set the working directory in the container
WORKDIR /app

# Copy the client files into the container
COPY /src .

                                                                       
EXPOSE 8000
# Set environment variables to allow the client to connect to the server running on localhost at port 8000

# Start the server
CMD node serverNoTls.js 
