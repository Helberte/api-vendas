import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTokens1693764830651 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user_tokens',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'token',
          type: 'uuid',
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'user_id',
          type: 'uuid'
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()'
        }
      ],
      foreignKeys: [
        {
          name: 'TokenUser', // nome da chave estrangeira
          referencedTableName: 'users', // tabela para a qual esta chave vai apontar
          referencedColumnNames: ['id'], // coluna que sera referenciada em 'users'
          columnNames: ['user_id'], // coluna da tabela atual que será chave estran..
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_tokens');
  }
}
