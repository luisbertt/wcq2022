import type { NextPage } from 'next'
import Head from 'next/head'
import teams from 'data/teams.json'
import matches from 'data/matches.json'

type Match = {
    MatchNumber: number
    RoundNumber: number
    DateUtc: string
    Location: string
    HomeTeam: string
    AwayTeam: string
    Group: string | null
    HomeTeamScore: number | null
    AwayTeamScore: number | null
}

type Standing = {
    Team: string
    Flag: string
    Group: string
    Position: number
    GamesPlayed: number
    Wins: number
    Draws: number
    Losses: number
    GoalsFor: number
    GoalsAgainst: number
    GoalDifference: number
    Points: number
}

function generateStandings(_matches: Match[]): Standing[] {
    const standings: Standing[] = teams.map((team) => ({
        Team: team.Team,
        Flag: team.Flag,
        Group: team.Group,
        Position: 1,
        GamesPlayed: 0,
        Wins: 0,
        Draws: 0,
        Losses: 0,
        GoalsFor: 0,
        GoalsAgainst: 0,
        GoalDifference: 0,
        Points: 0,
    }))

    return standings
}

function standingsByGroup(): Standing[][] {
    const groups = Array.from(new Set(teams.map((team) => team.Group)).values())
    const standings = groups.map((group) => generateStandings(matches).filter((standing) => standing.Group === group))
    return standings
}

const Home: NextPage = () => {
    const groupedStandings = standingsByGroup()
    return (
        <div>
            <Head>
                <title>World Cup Qatar 2022</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="pt-4">
                <h1 className="font-bold text-4xl text-center">World Cup Qatar 2022</h1>
            </header>

            <main className="mx-auto max-w-3xl py-4 flex grid grid-cols-4 gap-4 justify-items-center">
                {groupedStandings.map((standings) => (
                    <div className="p-4 border w-44">
                        {standings.map((standing) => (
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <span>
                                        <img src={standing.Flag} className="w-6 h-4" />
                                    </span>
                                    <span>{standing.Team}</span>
                                </div>
                                <span className="font-bold text-2xl">{standing.Points}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </main>
        </div>
    )
}

export default Home
