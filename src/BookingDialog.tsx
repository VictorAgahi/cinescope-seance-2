import { useEffect, useId, useRef } from "react";

export type Film = {
  id: number;
  title: string;
  genre: string;
  time: string;
  available: boolean;
  poster: string;
};

type BookingDialogProps = {
  film: Film;
  onClose: (confirmed: boolean) => void;
};

export default function BookingDialog({ film, onClose }: BookingDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = (returnValue: string) => dialogRef.current?.close(returnValue);

  return (
    <dialog ref={dialogRef} className="modal" aria-labelledby={titleId}
      onClose={(event) => onClose(event.currentTarget.returnValue === "confirm")}>
      <div className="dialog-heading">
        <h2 id={titleId}>Réserver {film.title}</h2>
        <button type="button" className="close" aria-label="Fermer la réservation" onClick={() => close("cancel")}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <p>{film.genre} · Séance de {film.time}</p>
      <p className={"availability " + (film.available ? "available" : "unavailable")}>
        {film.available ? "Places disponibles" : "Séance complète"}
      </p>
      <p>Consultez la séance et sa disponibilité avant de revenir au programme.</p>
      {film.available ? (
        <div className="dialog-buttons">
          <button className="dialog-action" type="button" onClick={() => close("confirm")}>Confirmer la réservation</button>
          <button className="dialog-action secondary" type="button" onClick={() => close("cancel")}>Annuler</button>
        </div>
      ) : (
        <button className="dialog-action" type="button" onClick={() => close("cancel")}>Revenir aux films</button>
      )}
    </dialog>
  );
}
