FROM public.ecr.aws/lambda/nodejs:14

# Copy function code
COPY dist ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "src/handlers/aws/todoHandler.get" ]
