import { Layout } from '@/components/layout/Layout';
import { User, Shield, Users } from 'lucide-react';

const management = [
  { name: 'Mustapha Musty', role: 'Team Manager' },
  { name: 'Barr. Adam', role: 'Legal Advisor' },
  { name: 'Abubakar Habule', role: 'Technical Director & Coach' },
  { name: 'Abdulraheem Bashir', role: 'General Secretary' },
  { name: 'Umar Malami', role: 'Captain' },
  { name: 'Philimon Oliver', role: 'Assistant Captain' },
];

const startingXI = [
  { number: 1, name: 'Mikel', position: 'GK', role: 'Goalkeeper' },
  { number: 2, name: 'Ibrahim Pepe', position: 'RB', role: 'Right Back' },
  { number: 3, name: 'Abdallah Barriser', position: 'CB', role: 'Centre Back' },
  { number: 4, name: 'Umara', position: 'CB', role: 'Centre Back', captain: true },
  { number: 5, name: 'Alkasim Kabo', position: 'LB', role: 'Left Back' },
  { number: 6, name: 'Nafiu Champion', position: 'DM', role: 'Defensive Midfielder' },
  { number: 7, name: 'Wasilu', position: 'CM', role: 'Central Midfielder' },
  { number: 8, name: 'ZA Boy', position: 'CM', role: 'Central Midfielder' },
  { number: 9, name: 'Aliyu Goma', position: 'RW', role: 'Right Wing' },
  { number: 10, name: 'Hassan Dembele', position: 'ST', role: 'Striker' },
  { number: 11, name: 'Al Qasim Bakabo', position: 'LW', role: 'Left Wing' },
];

const extendedSquad = [
  { number: 12, name: 'Abul Onana', position: 'GK' },
  { number: 13, name: 'Abdallah Barrister', position: 'DF' },
  { number: 14, name: 'Sulaiman Bachirawa', position: 'DF' },
  { number: 15, name: 'Ali Me Kaji', position: 'MF' },
  { number: 16, name: 'Abibu', position: 'MF' },
  { number: 17, name: 'Dan Kishiya', position: 'FW' },
  { number: 18, name: 'Warleed', position: 'FW' },
];

const notablePlayers = [
  { name: 'Umar Malami Ahmad', age: 19, position: 'LB', matches: 210, goals: 10, assists: 61 },
  { name: 'Aliyu Goma', age: 17, position: 'MF', matches: 199, goals: 11, assists: 7 },
  { name: 'Ahmadu Abdulmumin', age: 23, position: 'MF', matches: 143, goals: 9, assists: 13 },
  { name: 'Michael Bartholomew Paul', age: 19, position: 'MF', matches: 232, goals: 45, assists: 23 },
  { name: "Nafi'u Muhammad Usman", age: 19, position: 'LB', matches: 192, goals: 40, assists: 18 },
  { name: 'Aliyu Muhammad Jamo', age: 19, position: 'MF', matches: 203, goals: 55, assists: 25 },
];

const Team = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amtay-royal/20 rounded-full blur-3xl" />
        </div>
        <div className="container-premium relative">
          <span className="text-label text-amtay-royal">The Squad</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6">
            Meet AMTAY FC
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            The players, coaches, and management driving our rise to the top.
          </p>
        </div>
      </section>

      {/* Management */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label">Leadership</span>
            <h2 className="heading-section mt-2">Management Team</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {management.map((person, index) => (
              <div key={index} className="card-premium flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-amtay-blue/10 flex items-center justify-center">
                  <User className="w-7 h-7 text-amtay-blue" />
                </div>
                <div>
                  <h3 className="font-bold">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starting XI */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label">First Team</span>
            <h2 className="heading-section mt-2">Starting XI</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {startingXI.map((player) => (
              <div key={player.number} className="card-premium text-center relative">
                {player.captain && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-900">C</span>
                  </div>
                )}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amtay-blue to-amtay-midnight flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-black text-white">{player.number}</span>
                </div>
                <h3 className="font-bold text-sm mb-1">{player.name}</h3>
                <span className="inline-block px-2 py-1 bg-amtay-blue/10 text-amtay-blue text-xs font-semibold rounded-full">
                  {player.position}
                </span>
                <p className="text-xs text-muted-foreground mt-2">{player.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extended Squad */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label">Reserves</span>
            <h2 className="heading-section mt-2">Extended Squad</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {extendedSquad.map((player) => (
              <div key={player.number} className="p-4 rounded-xl bg-accent/50 text-center">
                <div className="text-2xl font-black text-amtay-blue mb-1">{player.number}</div>
                <h3 className="font-semibold text-sm mb-1">{player.name}</h3>
                <span className="text-xs text-muted-foreground">{player.position}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Players */}
      <section className="section-padding bg-amtay-midnight text-white">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label text-amtay-royal">Star Players</span>
            <h2 className="heading-section mt-2">Notable Players</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notablePlayers.map((player, index) => (
              <div 
                key={index} 
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{player.name}</h3>
                    <p className="text-white/60 text-sm">{player.age} years old • {player.position}</p>
                  </div>
                  <Shield className="w-6 h-6 text-amtay-royal" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-black">{player.matches}</div>
                    <div className="text-xs text-white/60 uppercase">Matches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-amtay-royal">{player.goals}</div>
                    <div className="text-xs text-white/60 uppercase">Goals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black">{player.assists}</div>
                    <div className="text-xs text-white/60 uppercase">Assists</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
