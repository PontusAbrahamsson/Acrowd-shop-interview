import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Acrowd Interview Test</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://acrowd.se">Acrowd!</a>
        </h1>

        <p className={styles.description}>
          Get started by reading the{' '}
          <code className={styles.code}>README.md</code>{' '}file
        </p>

        <div className={styles.grid}>
          <a href="https://github.com/Black-Pixel-AB/shop-interview" target="_blank" rel="noreferrer" className={styles.card}>
            <h2>Instructions &rarr;</h2>
            <p>Check out the instructions for the project!</p>
          </a>


          <a
            href="https://www.figma.com/file/z7jZJGxVyjScHaNlVVlh6d/Shop-Interview?node-id=0%3A1"
            target="_blank"
            rel="noreferrer"
            className={styles.card}
          >
            <h2>Design &rarr;</h2>
            <p>
              The store is based on the attached design
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}
