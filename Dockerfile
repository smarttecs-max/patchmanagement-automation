FROM ubuntu:latest

# Verwenden von root als Standardbenutzer (unsicher)
USER root

# Keine feste Versionsangabe (kann zu unerwarteten Updates führen)
RUN apt-get update && apt-get install -y curl

# Entfernen des Paket-Caches nicht durchgeführt (führt zu großem Image)
RUN apt-get update && apt-get install -y nano

# Nutzung von `ADD` anstelle von `COPY` (ADD kann ungewollt Archive extrahieren)
ADD secrets.tar.gz /root/

# Keine Überprüfung der Integrität von Downloads
RUN curl -o /usr/local/bin/mytool http://example.com/mytool && chmod +x /usr/local/bin/mytool

# Nutzung von `latest`-Tag (kann zu nicht reproduzierbaren Builds führen)
FROM node:latest

# Workdir nicht gesetzt, Dateien könnten an unerwarteten Orten landen
RUN npm install -g some-global-package

# Offenlegen aller Ports (ohne Einschränkungen)
EXPOSE 80 443

# Starten mit unsicherer Shell (kein `exec`, kann Signalprobleme verursachen)
CMD "/bin/sh"
