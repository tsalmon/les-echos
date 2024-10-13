# Elements manquants

1. Utiliser les migrations de TypeORM
2. Faire un script pour supprimer le volume docker des tests E2E

# Bonne pratique non appliquée

Je n'ai pas fait de TDD dans ce projet car j'ai eu peur de manquer de temps

# Amélioration d'architecture

Séparer la partie authentication dans un module a part et utiliser un intercepteur pour hacher le mot de passe quand l'utilisateur veut le changer