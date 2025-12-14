import React from 'react';
import { Link } from 'react-router-dom';
export default function Tile({ title, desc, link }) {
return (
<Link to={link} className="p-4 border rounded hover:shadow">
<h3 className="font-medium text-lg">{title}</h3>
<p className="text-sm mt-2 text-gray-600">{desc}</p>
</Link>
);
}