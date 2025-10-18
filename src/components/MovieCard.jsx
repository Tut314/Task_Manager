import React from "react";

const MovieCard = ({ m }) => {

    const {
        trackId,
        trackName,
        releaseDate,
        primaryGenreName,
        artworkUrl100,
        previewUrl,
        trackViewUrl,
    } = m || {};

    const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
    const genre = primaryGenreName || "Movie";
    const posterUrl = artworkUrl100?.replace("100x100bb", "300x300bb") || null;
  return (
    <li
      key={trackId}
      className="
        group flex items-start gap-3
        rounded-xl border border-gray-200 bg-white/70 p-3
        shadow-sm transition hover:shadow-md
        dark:border-white/10 dark:bg-zinc-900/60
      "
    >
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={trackName || "Poster"}
          className="h-16 w-16 rounded object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-16 w-16 shrink-0 rounded bg-gray-200 grid place-items-center text-gray-600">
          {(trackName || "?").slice(0, 1)}
        </div>
      )}
      <div className="min-w-0">
        <h3 className="truncate font-medium text-gray-900 dark:text-gray-100">
          {trackName || "Untitled"}
          {year ? ` (${year})` : ""}
        </h3>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          {genre}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded border px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/10"
            >
              Preview
            </a>
          )}

          {trackViewUrl && (
            <a
              href={trackViewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded bg-indigo-600 px-2 py-1 text-xs text-white hover:bg-indigo-500"
            >
              View in iTunes
            </a>
          )}
        </div>




      </div>
    </li>
  );
};

export default MovieCard;
