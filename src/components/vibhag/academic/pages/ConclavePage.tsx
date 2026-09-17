"use client";

import {
  ACPage,
  ACHero,
  ACSection,
  ACCard,
  ACGlassPanel,
  ACFooterStatement,
  SectionCTA,
  REG_LINKS,
  ACContactBlock,
} from "../AcademicCouncilUI";
import { CONCLAVE_BEST_PRACTICES_NOTE, CONCLAVE_OVERALL_LEADERSHIP, conclaves } from "../academic-content-data";
import { conclaveFormAnalyticsEvent, conclaveFormByProgrammeTitle } from "@/data/smk-6-external-registrations";
import { Smk6ExternalFormButton } from "@/components/registration/Smk6ExternalRegistrationPanels";
import ConclavePosterPreview from "../ConclavePosterPreview";
import ProgrammeSupportPanel from "@/components/contact/ProgrammeSupportPanel";
import { getOfficialContactByAcademicConclaveId } from "@/data/smk-6-official-contacts";

export default function ConclavePage() {
  return (
    <ACPage>
      <ACHero title="Conclaves – Shiksha Mahakumbh 6.0" />

      <ACSection title="Overview">
        <ACGlassPanel>
          <p className="text-base leading-relaxed text-gray-700 md:text-lg md:leading-8">
            The Conclaves at Shiksha Mahakumbh 6.0 serve as high-impact dialogue
            platforms bringing together leaders from academia, research,
            governance, industry, and society. These thematic conclaves aim to
            foster policy discussions, innovation exchange, and actionable
            outcomes aligned with the vision of Viksit Bharat 2047.{" "}
            {CONCLAVE_BEST_PRACTICES_NOTE}
          </p>
        </ACGlassPanel>
      </ACSection>

      <ACSection title="Conclave Categories">
        <div className="space-y-4">
          {conclaves.map((conclave, index) => (
            <ACCard key={conclave.id}>
              <h3 className="mb-4 text-lg font-bold text-brand-navy md:text-xl">
                {index + 1}. {conclave.icon} {conclave.title}
              </h3>
              {"titleHi" in conclave && conclave.titleHi ? (
                <p className="mb-3 font-devanagari text-sm text-gray-600 md:text-base">
                  {conclave.titleHi}
                </p>
              ) : null}
              <div className="space-y-3 text-sm leading-relaxed text-gray-700 md:text-base">
                {"date" in conclave && conclave.date ? (
                  <p>
                    <span className="font-semibold">Date:</span> {conclave.date}
                  </p>
                ) : null}
                {"time" in conclave && conclave.time ? (
                  <p>
                    <span className="font-semibold">Time:</span> {conclave.time}
                  </p>
                ) : null}
                {"venue" in conclave && conclave.venue ? (
                  <p>
                    <span className="font-semibold">Venue:</span> {conclave.venue}
                  </p>
                ) : null}
                <p>
                  <span className="font-semibold">Participants:</span>{" "}
                  {conclave.participants}
                </p>
                <p>
                  <span className="font-semibold">Focus:</span> {conclave.focus}
                </p>
                <p>
                  <span className="font-semibold">Output:</span> {conclave.output}
                </p>
                <p>
                  <span className="font-semibold">Theme:</span> {conclave.theme}
                </p>
                {"sessionChair" in conclave && conclave.sessionChair ? (
                  <p>
                    <span className="font-semibold">Session Chair:</span>{" "}
                    {conclave.sessionChair}
                  </p>
                ) : null}
                {"keynote" in conclave && conclave.keynote ? (
                  <p>
                    <span className="font-semibold">Keynote:</span> {conclave.keynote}
                  </p>
                ) : null}
                <div>
                  <p className="font-semibold">Coordinators:</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 break-words">
                    {conclave.coordinators.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
                {"contactCoordinators" in conclave && conclave.contactCoordinators ? (
                  <div>
                    <p className="font-semibold">Poster contact:</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 break-words">
                      {conclave.contactCoordinators.map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {"organizingTeam" in conclave && conclave.organizingTeam ? (
                  <p>
                    <span className="font-semibold">Organizing team:</span>{" "}
                    {conclave.organizingTeam}
                  </p>
                ) : null}
                {"registrationWindow" in conclave && conclave.registrationWindow ? (
                  <p>
                    <span className="font-semibold">Registration window (poster):</span>{" "}
                    {conclave.registrationWindow}
                  </p>
                ) : null}
                {"sessionNote" in conclave && conclave.sessionNote ? (
                  <p>{conclave.sessionNote}</p>
                ) : null}
                {"extraNotes" in conclave && conclave.extraNotes
                  ? conclave.extraNotes.map((note) => <p key={note}>{note}</p>)
                  : null}
                {"poster" in conclave && conclave.poster ? (
                  <ConclavePosterPreview poster={conclave.poster} title={conclave.title} />
                ) : null}
                {(() => {
                  const form = conclaveFormByProgrammeTitle(conclave.title);
                  const contact = getOfficialContactByAcademicConclaveId(conclave.id);
                  return (
                    <div className="space-y-3 pt-2">
                      {form ? (
                        <Smk6ExternalFormButton
                          href={form.url}
                          eventName={conclaveFormAnalyticsEvent(form.id)}
                        >
                          Register Now
                        </Smk6ExternalFormButton>
                      ) : null}
                      {contact ? (
                        <ProgrammeSupportPanel
                          contact={contact}
                          title="Need help with this conclave?"
                        />
                      ) : null}
                    </div>
                  );
                })()}
              </div>
            </ACCard>
          ))}
        </div>
      </ACSection>

      <ACSection title="Leadership & Coordination">
        <ACGlassPanel>
          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-lg font-bold text-brand-navy md:text-xl">
                Chair
              </h3>
              <p className="text-gray-700 md:text-lg">
                {CONCLAVE_OVERALL_LEADERSHIP.chair}
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-bold text-brand-navy md:text-xl">
                Co-Chairs
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                {CONCLAVE_OVERALL_LEADERSHIP.coChairs.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-bold text-brand-navy md:text-xl">
                Conveners
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                <li>Registrar, NIT Hamirpur</li>
                <li>Registrar, IIT Mandi</li>
                <li>Registrar, Central University of Himachal Pradesh</li>
              </ul>
            </div>
          </div>
        </ACGlassPanel>
      </ACSection>

      <ACSection title="Need help?">
        <ACContactBlock programmeId="conclaves" />
      </ACSection>

      <ACFooterStatement title="Driving Dialogue to Action">
        Each conclave is designed to move beyond discussions and generate
        practical frameworks, policy inputs, and collaborative pathways that
        contribute to shaping the future of education in India.
      </ACFooterStatement>

      <SectionCTA
        title="Apply for the conclave"
        buttonText="Register Now"
        href={REG_LINKS.conclave}
      />
    </ACPage>
  );
}
