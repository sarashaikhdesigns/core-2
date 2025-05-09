import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="container mx-auto flex flex-col items-center justify-between p-4">
        <h1 className="y2k-title mb-2">STYLESHARE</h1>
        <div className="y2k-subtitle mb-6">DRESS TO IMPRESS & CONNECT!</div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="mb-4 font-[var(--font-press-start-2p)] text-2xl text-[var(--y2k-yellow)] drop-shadow-[2px_2px_0_var(--y2k-purple)]">
            Share Your Style With The World
          </h2>
          <p className="mb-6 text-lg">
            Create your digital closet, discover new styles, and connect with fashion enthusiasts.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <button className="y2k-button y2k-button-primary">GET STARTED</button>
            </Link>
            <Link href="/login">
              <button className="y2k-button y2k-button-secondary">SIGN IN</button>
            </Link>
          </div>
        </section>

        <section className="mb-12 y2k-container">
          <h2 className="mb-6 font-[var(--font-press-start-2p)] text-xl text-[var(--y2k-yellow)] drop-shadow-[2px_2px_0_var(--y2k-purple)]">
            TRENDING CLOSETS
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Link href={`/closet/user${i}`} key={i} className="group">
                <div className="y2k-card transition-all duration-300 hover:scale-105">
                  <div className="y2k-card-header">
                    <h3 className="y2k-card-title">USER {i}'S CLOSET</h3>
                  </div>
                  <div className="aspect-[4/3] bg-[rgba(0,0,0,0.3)]">
                    <img
                      src={`/placeholder.svg?height=300&width=400&text=Closet ${i}`}
                      alt={`User ${i}'s closet`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="y2k-item-name">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[var(--y2k-purple)]">
                        <img
                          src={`/placeholder.svg?height=32&width=32&text=${i}`}
                          alt={`User ${i}`}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <p className="font-medium">User {i}</p>
                    </div>
                    <p className="text-sm text-[var(--y2k-green)]">
                      {30 + i} items • {10 + i} outfits
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="y2k-container">
          <h2 className="mb-6 font-[var(--font-press-start-2p)] text-xl text-[var(--y2k-yellow)] drop-shadow-[2px_2px_0_var(--y2k-purple)]">
            HOW IT WORKS
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--y2k-pink)] text-white">
                1
              </div>
              <h3 className="mb-2 font-[var(--font-press-start-2p)] text-sm text-[var(--y2k-blue)]">
                CREATE YOUR CLOSET
              </h3>
              <p className="text-[var(--y2k-text)]">
                Upload photos of your clothing items and organize them by category.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--y2k-blue)] text-white">
                2
              </div>
              <h3 className="mb-2 font-[var(--font-press-start-2p)] text-sm text-[var(--y2k-pink)]">BUILD OUTFITS</h3>
              <p className="text-[var(--y2k-text)]">
                Mix and match items to create and save your favorite outfit combinations.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--y2k-purple)] text-white">
                3
              </div>
              <h3 className="mb-2 font-[var(--font-press-start-2p)] text-sm text-[var(--y2k-green)]">
                CONNECT & DISCOVER
              </h3>
              <p className="text-[var(--y2k-text)]">
                Follow other users, get inspired, and share your style with the community.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--y2k-border)] bg-[rgba(0,0,51,0.7)] py-6">
        <div className="container mx-auto px-4 text-center text-[var(--y2k-text)]">
          <p>© 2024 StyleShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
