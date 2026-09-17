import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getOfficialContactByAcademicConclaveId,
  getOfficialContactByConclaveFormId,
  getOfficialContactById,
  getOfficialContactByRegistrationType,
  SMK_6_OFFICIAL_CONTACTS,
} from "../../src/data/smk-6-official-contacts";

describe("SMK 6.0 official contact directory", () => {
  it("routes the official programme emails as supplied", () => {
    assert.equal(getOfficialContactById("multi-track-conference")?.email, "academics@shikshamahakumbh.com");
    assert.equal(getOfficialContactById("conference-series")?.email, "academics@shikshamahakumbh.com");
    assert.equal(getOfficialContactById("shodhankur")?.email, "academics@shikshamahakumbh.com");
    assert.equal(getOfficialContactById("student-projects")?.email, "academics@shikshamahakumbh.com");
    assert.equal(getOfficialContactById("conclaves")?.email, "conclaves@shikshamahakumbh.com");
    assert.equal(getOfficialContactById("conclave-vcs-directors")?.email, "director@shikshamahakumbh.com");
    assert.equal(getOfficialContactById("general-enquiry")?.email, "info@shikshamahakumbh.com");
    assert.equal(getOfficialContactById("sponsorship-partnership")?.email, "director@shikshamahakumbh.com");
  });

  it("maps registration types without inventing olympiad or awards emails", () => {
    assert.equal(getOfficialContactByRegistrationType("Shodhankur").id, "shodhankur");
    assert.equal(getOfficialContactByRegistrationType("Projects").id, "student-projects");
    assert.equal(getOfficialContactByRegistrationType("Delegate Registration").id, "general-enquiry");
    assert.equal(getOfficialContactByRegistrationType("Accommodation").id, "accommodation");
    assert.equal(getOfficialContactByRegistrationType("Olympiad")?.email, undefined);
    assert.equal(getOfficialContactByRegistrationType("Awards")?.email, undefined);
  });

  it("keeps conclave Google Forms on their own official contacts", () => {
    assert.equal(getOfficialContactByConclaveFormId("principalsTeachers")?.id, "conclave-principals");
    assert.equal(getOfficialContactByConclaveFormId("talent")?.email, "conclaves@shikshamahakumbh.com");
  });

  it("maps Academic Council conclave pages to dedicated contacts", () => {
    assert.equal(getOfficialContactByAcademicConclaveId("vcs-directors")?.email, "director@shikshamahakumbh.com");
    assert.equal(getOfficialContactByAcademicConclaveId("defence-security")?.email, "conclaves@shikshamahakumbh.com");
  });

  it("does not invent emails for programmes absent from the official list", () => {
    const invented = SMK_6_OFFICIAL_CONTACTS.filter((item) =>
      ["olympiad", "awards", "exhibition", "cultural", "best-practices"].includes(item.id)
    );
    assert.ok(invented.every((item) => !item.email));
  });
});
