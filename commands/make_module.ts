import { BaseCommand, args } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import { generators } from '@adonisjs/core/app'
import { stubsRoot } from '../stubs/main.js'

export default class MakeModule extends BaseCommand {
  static commandName = 'make:module'
  static description = 'Create a new module structure'
  static options: CommandOptions = {}

  @args.string({ description: 'Name of the module' })
  declare name: string

  async run() {
    const codemods = await this.createCodemods()
    const entity = generators.createEntity(this.name)
    const modulePath = `app/modules/${entity.name}`

    // Create a default controller
    await codemods.makeUsingStub(stubsRoot, 'make/module/controller.stub', {
      entity: { name: `${entity.name}Controller`, path: `${modulePath}/Controllers` },
    })

    // Create a default model
    await codemods.makeUsingStub(stubsRoot, 'make/module/model.stub', {
      entity: { name: `${entity.name}Model`, path: `${modulePath}/Models` },
    })

    console.log(`Module ${entity.name} created successfully at ${modulePath}`)
  }
}
