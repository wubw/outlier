cd ..

cd frontend
call npm install
call ng build --env=test
cd ..

cd backend
cd outlier.api
dotnet publish -c Release -o ./obj/Docker/publish
cd ..
cd ..

cd deploy