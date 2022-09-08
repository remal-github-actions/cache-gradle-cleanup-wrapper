import * as core from '@actions/core'
import * as glob from '@actions/glob'
import * as rimraf from 'rimraf'

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

async function run(): Promise<void> {
    try {
        let gradleUserHome = process.env.GRADLE_USER_HOME || '~/.gradle'
        const globber = await glob.create(gradleUserHome + '/wrapper/dists/*/*/*.zip')
        for await (const file of globber.globGenerator()) {
            core.info(`Removing ${file}`)
            rimraf.sync(file, {
                disableGlob: true
            })
        }

    } catch (error) {
        core.setFailed(error instanceof Error ? error : (error as object).toString())
        throw error
    }
}

//noinspection JSIgnoredPromiseFromCall
run()
