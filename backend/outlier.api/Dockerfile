FROM microsoft/aspnetcore:2.0
ARG source
WORKDIR /app
EXPOSE 80
COPY ${source:-obj/Docker/publish} /app
ENTRYPOINT ["dotnet", "outlier.api.dll"]
