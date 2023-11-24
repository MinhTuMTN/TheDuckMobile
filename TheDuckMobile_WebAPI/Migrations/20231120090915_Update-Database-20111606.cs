using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheDuckMobile_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase20111606 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "StoreId",
                table: "Provines",
                type: "uniqueidentifier",
                nullable: true,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Provines_StoreId",
                table: "Provines",
                column: "StoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_Provines_Stores_StoreId",
                table: "Provines",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Provines_Stores_StoreId",
                table: "Provines");

            migrationBuilder.DropIndex(
                name: "IX_Provines_StoreId",
                table: "Provines");

            migrationBuilder.DropColumn(
                name: "StoreId",
                table: "Provines");
        }
    }
}
