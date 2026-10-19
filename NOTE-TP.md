# Note TP - Fenêtre modale de réservation

Victor Agahi, Victor Giroud

## Constats

1. Le bouton pour réserver est un `div` avec un clic. Il n'est pas sélectionnable au clavier et n'a pas le rôle `button`, donc on ne peut pas ouvrir la réservation avec tab, et il n'apparaît pas dans l'arbre d'accessibilité.
2. La fenêtre de réservation est un `div` sans rôle ni nom. Un lecteur d'écran n'annonce pas son ouverture, le focus reste sur la page derrière, et tab permet de sortir de la fenêtre.
3. La fermeture est un `span` avec un clic, sans nom. On ne peut pas fermer au clavier (à part Escape), le bouton est muet pour un lecteur d'écran, et le focus est perdu : il retourne en haut de la page au lieu du film demandé.

## Ce qu'on a corrigé

- Le déclencheur est maintenant un `button`, on peut donc l'atteindre avec tab et l'activer avec Entrée ou Espace. Son nom est « Réserver Après l'aube ».
- La fenêtre est un `dialog` ouvert avec `showModal()`, nommé avec `aria-labelledby`. Le focus entre dans la fenêtre à l'ouverture et le reste de la page devient inerte.
- La fermeture est un vrai `button` avec le nom « Fermer la réservation », et le focus revient sur le bouton du film qui a ouvert la fenêtre.
- On a respecté les contraintes : aucun `tabIndex`, uniquement des éléments natifs (`button`, `dialog`), et l'indicateur de focus est conservé.

## Bonus

- `BookingDialog` est extrait dans `src/BookingDialog.tsx`, avec des props typées (`Film`, `onClose(confirmed)`). Le nom du dialogue et le cycle du focus sont conservés.
- Si la séance est disponible, il y a « Confirmer la réservation » (`returnValue = "confirm"`), distinct de « Annuler » et de la fermeture (Escape, bouton ×). Si la séance est complète, il y a seulement « Revenir aux films ».
- Le résultat s'affiche dans une région `role="status"` toujours présente dans la page, rendue depuis l'état, sans déplacer le focus. Le message est numéroté (« Réservation n° 2 ») : deux confirmations du même film donnent un texte différent, sans devoir vider puis réinsérer le texte avec un délai.
- Une annulation ne modifie pas la région. Le `:empty` réduit la région sans `display: none`, qui la retirerait de l'arbre d'accessibilité.

## Vérifications

- Test au clavier : tab jusqu'au bouton, Entrée et Espace ouvrent la fenêtre, tab et Maj+Tab restent dans la fenêtre.
- Test dans les DevTools (onglet Accessibilité) : rôle `button` avec le nom « Réserver Après l'aube », puis rôle `dialog` avec le nom « Réserver … ».
- Test du retour du focus, avec 2 films : après Escape, le bouton « Fermer la réservation » ou « Revenir aux films », `document.activeElement` est le bouton du film demandé.
- À vérifier avec l'enseignant : annonce du statut, annulations, séance complète, deux confirmations du même film.
