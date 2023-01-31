# Burgiss Technology Stack Demo

### I had some free time this weekend and wanted to demonstrate my skills in the current Burgiss technology stack. I have limited information about it but I am aware that it includes: Docker Containers, .NET Core, Angular 11+, Azure, Kubernetes, Node.js, RESTful APIs, and SQL Server.

To demonstrate my knowledge in all these areas I decided to make an employee database portal that allows an admin to change employee information, delete employees, and update employees. The admin will also be able to see analytics based on this data. This project uses `ASP.NET Core 6` to create a `RESTful API` which is paired with an `SQL server` which is hosted on `Azure` to store our employee data. It also uses `Angular 14` as a front end which is hosted on firebase. I used NPM which is a package manager for `Node.js` packages which is needed for our front end. The backend stored in a `docker` container which is uploaded to `ACR (Azure Container Registry)`. Lastly this docker image is pushed to an `AKS (Azure Kubernetes Service)` pod. Using all these technologies allows us to create a fast and efficient `SPA (Single Page Application)` with a `very scalable and high availability RESTful API`.

# [View Here](https://employeeadminprofileui.web.app/)

Below is a very high level overview with example of how I created this project. I will be describing in a tutorial fashion to show a greater understanding of these technologies that have been used.

Here are the specifics for creating an ASP.NET Core 6 web app API hosted on Azure Container Registry and using Azure Kubernetes Service:

1.  Create an ASP.NET Core 6 Web API project:

![Imgur](https://i.imgur.com/THxeyWd.png)

3.  Dockerize the application:
4.  Push the Docker image to Azure Container Registry:

    - Login to your Azure account using the `az` CLI command: `az login`.
    - Create a new Azure Container Registry instance: `az acr create --name <registry_name> --resource-group <resource_group_name> --sku Standard --location <location>`.
    - Login to the Azure Container Registry using the Docker CLI: `docker login <registry_name>.azurecr.io`.
    - Build the Docker image using the Dockerfile: `docker build -t <registry_name>.azurecr.io/<image_name>:<tag> .`.
    - Push the image to Azure Container Registry: `docker push <registry_name>.azurecr.io/<image_name>:<tag>`.

5.  Create an Azure Kubernetes Service cluster:

    - Create a new AKS cluster: `az aks create --name <cluster_name> --resource-group <resource_group_name> --node-count <number_of_nodes> --generate-ssh-keys --service-principal <app-id> --client-secret <password>`.
    - Connect to the AKS cluster using `kubectl`: `az aks get-credentials --name <cluster_name> --resource-group <resource_group_name>`.

6.  Deploy the containerized application to AKS:
    - Create a Kubernetes deployment for the application: `kubectl create deployment <deployment_name> --image=<registry_name>.azurecr.io/<image_name>:<tag>`.
    - Create a Kubernetes service to expose the deployment: `kubectl expose deployment <deployment_name> --type=LoadBalancer --port=80 --target-port=<target_port>`.
7.  Verify the deployment:
    - Check the status of the deployment: `kubectl get deployments`.
    - Check the status of the service: `kubectl get services`.
    - Get the external IP address of the service: `kubectl get service <service_name> -o -jsonpath='{.status.loadBalancer.ingress[0].ip}'`.
    - Verify that the application is accessible using the external IP address and port.

Note: Replace placeholders like `<registry_name>`, `<resource_group_name>`, etc. with actual values. The target port should match the port specified in the Web API project.

![Imgur](https://i.imgur.com/UfU5HX9.png)

![Imgur](https://i.imgur.com/ayg62WU.png)

Now lets move on to the front end:

To create an Angular front end and host it on Firebase, follow these steps:

1.  Install Angular CLI:

2.  Create a new Angular project:

3.  Change into the project directory:

4.  Serve the Angular project locally to test it:

5.  Go to Firebase and create a new project.
6.  Install Firebase CLI:
7.  Log in to Firebase CLI:

8.  Initialize Firebase in your Angular project:

9.  Choose "Hosting" and select your Firebase project.
10. Set the public directory to "dist/project-name":
11. Build the Angular project for production:

12. Deploy the Angular project to Firebase Hosting:

13. Your Angular front-end should now be hosted on Firebase and accessible via the provided URL.

Here is the main employee view component typescript file as well as the employee service file:

|![Imgur](https://i.imgur.com/uiHTnsM.png)

![Imgur](https://i.imgur.com/tawrCjF.png)

Lastly lets look at how I seeded and created the database.

To migrate ASP.NET Core 6 Web API models to SQL Server, you can use Entity Framework Core (EF Core), which is a modern object-relational mapping (ORM) framework for .NET. Here are the steps to migrate your Web API models to SQL Server:

1.  Install the EF Core packages for SQL Server:

`dotnet add package Microsoft.EntityFrameworkCore.SqlServer`

2.  Add a new class in your project to represent your database context and inherit from `DbContext`.

![Imgur](https://i.imgur.com/dNRw850.png)

3.  Register your database context in the Startup.cs file's `ConfigureServices` method.

4.  Add the connection string to the appsettings.json file.

5.  Use the `dotnet ef` CLI tool to create a migration:

    `dotnet ef migrations add InitialCreate`

6.  Apply the migration to your database:

    `dotnet ef database update`

7.  You should now have a SQL Server database with tables that match the models defined in your `ApplicationDbContext` class. You can now interact with the database through Entity Framework in your Web API controllers.

Lastly I seeded the data base with the following python script I created:

![Imgur](https://i.imgur.com/lGUexaD.png)
