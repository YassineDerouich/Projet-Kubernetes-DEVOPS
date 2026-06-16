<img width="4236" height="2865" alt="architecture_devsecops_kubernetes_(ultimate)" src="https://github.com/user-attachments/assets/ae554b02-3c8b-494a-90d7-8622af7c68da" />

#  DE `kubectl apply` AU **GITOPS ABSOLU**

> Mise en place d’une plateforme Kubernetes **moderne, sécurisée et automatisée**, basée sur les principes **GitOps**, **Zero-Downtime** et **Zero-Trust**.

---

#  ARCHITECTURE GITOPS

##  Gestion multi-environnements (Staging / Production)

Le dépôt Git est structuré pour gérer plusieurs environnements :

* **Staging**
* **Production**

Grâce à **Kustomize**, chaque environnement possède :

* ses propres variables
* ses propres ressources
* ses propres configurations

 Le dépôt devient **l’unique source de vérité du cluster**.

---

##  Synchronisation automatique avec ArgoCD

ArgoCD est configuré pour :

* Surveiller le dépôt Git en continu
* Synchroniser automatiquement les changements
* Garantir que l’état du cluster correspond exactement au dépôt

 **Plus aucun `kubectl apply` manuel.**

---

#  DÉPLOIEMENTS ZERO-DOWNTIME

##  Stratégie Canary avec Argo Rollouts

Le frontend est déployé avec une stratégie **Canary** :

* Déploiement progressif de la nouvelle version
* Analyse automatique des performances
* Rollback immédiat en cas de problème

---

##  Analyse en temps réel avec Prometheus

Argo Rollouts interroge **Prometheus en temps réel** pour vérifier :

* Les erreurs HTTP
* La latence
* Les anomalies de performance

Si un problème est détecté :

 **Rollback automatique vers la version stable**

---

#  SÉCURITÉ — APPROCHE ZERO-TRUST (SecOps)

##  Gestion dynamique des secrets

Aucun secret n’est stocké en clair dans Kubernetes.

Mise en place de :

* **HashiCorp Vault**
* **External Secrets Operator (ESO)**

Résultat :

* Les secrets sont générés dynamiquement
* Le cluster ne stocke jamais de données sensibles en clair

---

##  Isolation réseau

Mise en place de **NetworkPolicies strictes** :

* Mode **Default Deny**
* Seules les communications explicitement autorisées sont possibles
* Isolation complète entre les services

---

##  Durcissement des pods

Tous les pods sont configurés avec :

* `runAsNonRoot: true`
* `readOnlyRootFilesystem: true`
* Permissions minimales
* Sécurité renforcée par défaut

---

#  AUDIT CONTINU DU CLUSTER

## Analyse automatique avec Trivy Operator

Le cluster est analysé en continu pour détecter :

* Les CVE dans les images Docker
* Les mauvaises configurations Kubernetes
* Les failles de sécurité dans les manifests YAML

 **Une visibilité en temps réel sur l’état de sécurité du cluster**

---

#  STACK TECHNIQUE

Ce projet a permis de faire fonctionner ensemble :

* Kubernetes
* ArgoCD
* Argo Rollouts
* Prometheus
* HashiCorp Vault
* External Secrets Operator
* Trivy Operator
* Traefik
* Kustomize



---

#  RETOUR D’EXPÉRIENCE

Ce projet a été un **défi technique intense** :

* Architecture GitOps complète
* Déploiements sans coupure
* Sécurité Zero-Trust
* Analyse automatique + rollback intelligent


