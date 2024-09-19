FROM codercom/code-server

USER root

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && \
  apt-get install -y nodejs

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

USER coder

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
