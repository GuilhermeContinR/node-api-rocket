import { InMemoryChallengeRepositories } from "../../../testes/repositories/in-memory-challenge-repositories";
import { InMemoryStudentsRepositories } from "../../../testes/repositories/in-memory-students-repositories";
import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/student";
import { CreateChallengeSubmission } from "./create-challenge-submission";

describe('Create challenge submission use case', () => {
  it('should be able to create a new  challenge submission', async () => {
      const StudentsRepository = new InMemoryStudentsRepositories();
      const ChallengesRepository = new InMemoryChallengeRepositories();

      const student = Student.create({
        nome:'Guilherme',
        email:'http://example.com'
      })

      StudentsRepository.items.push(student);

      const challenge = Challenge.create({
        title:'Challenge 01',
        instructionsUrl:'http://example.com'
      })

      ChallengesRepository.items.push(challenge);


      const sut = new CreateChallengeSubmission(
        StudentsRepository,
        ChallengesRepository
      );

      const response = sut.execute({
        studentId:student.id,
        challengeId:challenge.id
      });

      expect(response).toBeTruthy();
  });
});
