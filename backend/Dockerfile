FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
RUN groupadd --system truehand && useradd --system --gid truehand --no-create-home truehand
USER truehand:truehand
EXPOSE 8080
ENTRYPOINT ["java","-Duser.timezone=UTC","-jar","/app/app.jar"]
