import { AceFactory } from '@adonisjs/core/factories'
import { test } from '@japa/runner'
import MakeModule from '../../commands/make_module.js'

test.group('MakeModule', (group) => {
  group.each.teardown(async () => {
    delete process.env.ADONIS_ACE_CWD
  })

  test('make a module', async ({ fs }) => {
    const ace = await new AceFactory().make(fs.baseUrl)
    console.log(fs.baseUrl)

    ace.ui.switchMode('raw')

    const command = await ace.create(MakeModule, ['user'])
    await command.exec()

    // command.assertLog('green(DONE:)    create app/Modules/User/Controllers')
    // command.assertLog('green(DONE:)    create app/Modules/User/Models')
    // command.assertLog('green(DONE:)    create app/Modules/User/Actions')
    // command.assertLog('green(DONE:)    create app/Modules/User/Validators')
    // command.assertLog('green(DONE:)    create app/Modules/User/Routes')
  })
})
