import { Link } from "@remix-run/react";

function EntryListItem({ entry, canEdit }) {
  return (
    <li className="group">
      {entry.text}

      {canEdit && (
        <Link
          to={`/entries/${entry._id}/edit`}
          className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100"
        >
          Edit
        </Link>
      )}
    </li>
  );
}

export default EntryListItem;
