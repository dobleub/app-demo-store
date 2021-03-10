### App Stage
FROM node:14-alpine
# Setting up envs
ENV N_PATH "/usr/src/app"
ENV N_USER "node"
# Install nodemon for production
RUN npm install -g nodemon
# Create app dir
WORKDIR ${N_PATH}
RUN chmod -R 777 ${N_PATH}
# Adding files to project
COPY ./app .
RUN chown -R ${N_USER}:${N_USER} .
RUN yarn install

# Setting up logs dir
ENV PATH ${N_PATH}/node_modules/.bin:$PATH
RUN mkdir -p /home/${N_USER}/.npm/_logs
RUN chown -R ${N_USER}:${N_USER} /home/${N_USER}/.npm

USER ${N_USER}
# CMD [ "pm2", "logs" ]
CMD [ "yarn", "start" ]

EXPOSE 3000
