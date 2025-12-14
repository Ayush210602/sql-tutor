import React from 'react';
import Tile from '../components/Tile';
export default function Home(){
return (
<div className="max-w-6xl mx-auto p-6">
<h1 className="text-2xl font-semibold mb-4">Welcome to SQL Tutor</h1>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<Tile title="Assignments" desc="Practice with prepared problems" link="/assignments" />
<Tile title="Events" desc="Timeboxed challenges" link="/events" />
<Tile title="Learn" desc="Modules and practice" link="/learn" />
</div>
</div>
);
}