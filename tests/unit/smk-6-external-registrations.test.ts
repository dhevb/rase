import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  SMK_6_CONCLAVE_FORMS,
  SMK_6_CONCLAVE_REGISTRATION_HREF,
  SMK_6_EXTERNAL_REGISTRATIONS,
  SMK_6_PROGRAMME_TRACKS_HREF,
  SMK_6_PUBLIC_REGISTRATION_CARDS,
  conclaveFormByProgrammeTitle,
  smk6RegistrationEntryForType,
} from "../../src/data/smk-6-external-registrations";

describe("SMK 6.0 official Google Form mapping", () => {
  it("keeps the official conclave form URLs unchanged", () => {
    assert.equal(SMK_6_CONCLAVE_FORMS.length, 5);
    assert.equal(
      SMK_6_EXTERNAL_REGISTRATIONS.conclaves.principalsTeachers.url,
      "https://docs.google.com/forms/d/e/1FAIpQLSfc8_Sur2uf-2wfXwJR9ivXjhB7Es3LGUrEkWpP_soanK9uYQ/viewform?usp=header"
    );
    assert.equal(
      SMK_6_EXTERNAL_REGISTRATIONS.conclaves.scientistsResearch.url,
      "https://docs.google.com/forms/d/e/1FAIpQLSdfyfl9-gdFBorshxGp1bPixoCmFVgSCoMlH3ACogzltZDt3g/viewform?usp=header"
    );
    assert.equal(
      SMK_6_EXTERNAL_REGISTRATIONS.conclaves.startupEntrepreneurs.url,
      "https://docs.google.com/forms/d/e/1FAIpQLSeipr5-D3f8NK6s060GHlpTcrgBOsvDec8XsUgtHFHxv_w23g/viewform?usp=header"
    );
    assert.equal(
      SMK_6_EXTERNAL_REGISTRATIONS.conclaves.talent.url,
      "https://docs.google.com/forms/d/e/1FAIpQLSdIUmfUK9qcTg3U79MhY2X367m8fyolGxyXw9TtEv5Zf8kDVQ/viewform?usp=header"
    );
    assert.equal(
      SMK_6_EXTERNAL_REGISTRATIONS.conclaves.media.url,
      "https://docs.google.com/forms/d/e/1FAIpQLSc473niVsUiA4vSa7uOs8Jbzz4-3J06BVQWDASYa6JMu9gKhg/viewform?usp=publish-editor"
    );
  });

  it("maps Shodhankur and Student Projects to the supplied forms.gle URLs", () => {
    assert.equal(SMK_6_EXTERNAL_REGISTRATIONS.shodhankur.url, "https://forms.gle/octRMFkzfrZt9dAF9");
    assert.equal(
      SMK_6_EXTERNAL_REGISTRATIONS.studentProjects.url,
      "https://forms.gle/VJvWjT9kDkxtniv48"
    );
  });

  it("keeps Shodhankur and Student Projects as separate destinations", () => {
    assert.notEqual(
      SMK_6_EXTERNAL_REGISTRATIONS.shodhankur.url,
      SMK_6_EXTERNAL_REGISTRATIONS.studentProjects.url
    );
  });

  it("routes Conclave to the public hub selector with official forms", () => {
    assert.equal(SMK_6_CONCLAVE_REGISTRATION_HREF, "/registration#conclave-registration");
    assert.deepEqual(smk6RegistrationEntryForType("Conclave"), {
      href: "/registration#conclave-registration",
      external: false,
    });
  });

  it("keeps Programme tracks on the Academic Council route", () => {
    assert.equal(SMK_6_PROGRAMME_TRACKS_HREF, "/departments/academic-council");
  });

  it("publishes the six public registration options in the required order", () => {
    assert.deepEqual(
      SMK_6_PUBLIC_REGISTRATION_CARDS.map((card) => card.id),
      [
        "multi-track-conference",
        "programme-tracks",
        "shodhankur",
        "student-projects",
        "conclaves",
        "delegate",
      ]
    );
  });

  it("matches published conclave titles to the correct form", () => {
    assert.equal(conclaveFormByProgrammeTitle("Talented Students Conclave")?.id, "talent");
    assert.equal(
      conclaveFormByProgrammeTitle("Principal and Outstanding Teacher Conclave")?.id,
      "principalsTeachers"
    );
    assert.equal(conclaveFormByProgrammeTitle("Media Conclave")?.id, "media");
    assert.equal(conclaveFormByProgrammeTitle("VCs & Directors Conclave"), null);
    assert.equal(conclaveFormByProgrammeTitle("VC/Directors Conclave"), null);
  });
});
