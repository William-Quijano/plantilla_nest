import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigrationsTables1689625540711 implements MigrationInterface {
    name = 'CreateMigrationsTables1689625540711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mantenimientos"."persons" ("id" BIGSERIAL NOT NULL, "name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "dui" character varying(10) NOT NULL, "user_id" bigint, CONSTRAINT "UQ_0ea489a2799a7703c41a6aaf002" UNIQUE ("dui"), CONSTRAINT "REL_114ed4a43ad36502663f8fde31" UNIQUE ("user_id"), CONSTRAINT "PK_74278d8812a049233ce41440ac7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mantenimientos"."permissions" ("id" BIGSERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mantenimientos"."roles" ("id" BIGSERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mantenimientos"."model_has_roles" ("id" BIGSERIAL NOT NULL, "entityType" character varying(255) NOT NULL, "entityId" bigint NOT NULL, "role_id" bigint, CONSTRAINT "PK_b951b878afa160f556c1e69ba67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mantenimientos"."model_has_permissions" ("id" BIGSERIAL NOT NULL, "entityType" character varying(255) NOT NULL, "entityId" bigint NOT NULL, "permission_id" bigint, CONSTRAINT "PK_020f5d78c2cd36ee6d1514458c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mantenimientos"."users" ("id" BIGSERIAL NOT NULL, "email" character varying NOT NULL, "password" text NOT NULL, "last_login" character varying(255) NOT NULL, "is_suspended" boolean NOT NULL DEFAULT false, "token_valid_after" character varying(255) NOT NULL, "two_factor_status" boolean NOT NULL DEFAULT false, "verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mantenimientos"."role_has_permissions" ("permission_id" bigint NOT NULL, "role_id" bigint NOT NULL, CONSTRAINT "PK_bc4792445e658ccfc1b7723d1f5" PRIMARY KEY ("permission_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_09ff9df62bd01f8cf45b1b1921" ON "mantenimientos"."role_has_permissions" ("permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9135e97d2d840f7dfd6e664911" ON "mantenimientos"."role_has_permissions" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "mantenimientos"."persons" ADD CONSTRAINT "FK_114ed4a43ad36502663f8fde31a" FOREIGN KEY ("user_id") REFERENCES "mantenimientos"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mantenimientos"."model_has_roles" ADD CONSTRAINT "FK_b5dd1765d08875537905531964a" FOREIGN KEY ("role_id") REFERENCES "mantenimientos"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mantenimientos"."model_has_permissions" ADD CONSTRAINT "FK_13509c4b6bd22929729065fe962" FOREIGN KEY ("permission_id") REFERENCES "mantenimientos"."permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mantenimientos"."role_has_permissions" ADD CONSTRAINT "FK_09ff9df62bd01f8cf45b1b1921a" FOREIGN KEY ("permission_id") REFERENCES "mantenimientos"."permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mantenimientos"."role_has_permissions" ADD CONSTRAINT "FK_9135e97d2d840f7dfd6e6649116" FOREIGN KEY ("role_id") REFERENCES "mantenimientos"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mantenimientos"."role_has_permissions" DROP CONSTRAINT "FK_9135e97d2d840f7dfd6e6649116"`);
        await queryRunner.query(`ALTER TABLE "mantenimientos"."role_has_permissions" DROP CONSTRAINT "FK_09ff9df62bd01f8cf45b1b1921a"`);
        await queryRunner.query(`ALTER TABLE "mantenimientos"."model_has_permissions" DROP CONSTRAINT "FK_13509c4b6bd22929729065fe962"`);
        await queryRunner.query(`ALTER TABLE "mantenimientos"."model_has_roles" DROP CONSTRAINT "FK_b5dd1765d08875537905531964a"`);
        await queryRunner.query(`ALTER TABLE "mantenimientos"."persons" DROP CONSTRAINT "FK_114ed4a43ad36502663f8fde31a"`);
        await queryRunner.query(`DROP INDEX "mantenimientos"."IDX_9135e97d2d840f7dfd6e664911"`);
        await queryRunner.query(`DROP INDEX "mantenimientos"."IDX_09ff9df62bd01f8cf45b1b1921"`);
        await queryRunner.query(`DROP TABLE "mantenimientos"."role_has_permissions"`);
        await queryRunner.query(`DROP TABLE "mantenimientos"."users"`);
        await queryRunner.query(`DROP TABLE "mantenimientos"."model_has_permissions"`);
        await queryRunner.query(`DROP TABLE "mantenimientos"."model_has_roles"`);
        await queryRunner.query(`DROP TABLE "mantenimientos"."roles"`);
        await queryRunner.query(`DROP TABLE "mantenimientos"."permissions"`);
        await queryRunner.query(`DROP TABLE "mantenimientos"."persons"`);
    }

}
