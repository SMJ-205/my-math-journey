"use client";

import { Question } from "@/content/questions/questionBank";
import { FruitBasketSimulator } from "./FruitBasket";
import { CircleFractionSimulator } from "./CircleFraction";
import { ColumnArithmeticSimulator } from "./ColumnArithmetic";
import { PatternSequenceSimulator } from "./PatternSequence";
import { WordProblemBuilderSimulator, WordProblemSlot } from "./WordProblemBuilder";
import { AlgebraBalanceSimulator } from "./AlgebraBalance";
import { LadderMethodSimulator } from "./LadderMethod";
import { NumberTheoryVisualSimulator } from "./NumberTheoryVisual";

interface SimulatorRendererProps {
  question: Question;
  // Called for typed-input simulators (column-arithmetic, pattern-sequence, word-problem-builder)
  onAnswer?: (value: string, isCorrect: boolean, misconceptionTag?: string) => void;
}

export function SimulatorRenderer({ question, onAnswer }: SimulatorRendererProps) {
  const { simulator } = question;

  switch (simulator.type) {
    case "fruit-basket": {
      const fruits = (simulator.fruits as string[])?.[0] ?? "apel";
      return (
        <FruitBasketSimulator
          initialCount={simulator.initialCount as number}
          addCount={(simulator.addCount as number) ?? 0}
          removeCount={(simulator.removeCount as number) ?? 0}
          fruitEmoji={fruits}
        />
      );
    }
    case "circle-fraction":
      return (
        <CircleFractionSimulator
          totalSegments={simulator.totalSegments as number}
          filledSegments={simulator.filledSegments as number}
          interactive={(simulator.interactive as boolean) ?? false}
          showFractionLabel={(simulator.showFractionLabel as boolean) ?? false}
        />
      );
    case "algebra-balance":
      return (
        <AlgebraBalanceSimulator
          leftExpr={(simulator.leftExpr as string) ?? "n + 5"}
          rightExpr={(simulator.rightExpr as string) ?? "10"}
          variableName={(simulator.variableName as string) ?? "n"}
        />
      );
    case "column-arithmetic":
      return (
        <ColumnArithmeticSimulator
          operation={simulator.operation as "add" | "subtract" | "multiply" | "divide"}
          operands={simulator.operands as [number, number]}
          digitCount={simulator.digitCount as number}
          onAnswer={onAnswer}
        />
      );
    case "pattern-sequence":
      return (
        <PatternSequenceSimulator
          sequence={simulator.sequence as (number | null)[]}
          missingIndices={simulator.missingIndices as number[]}
          correctValues={simulator.correctValues as number[]}
          ruleDescription={simulator.ruleDescription as string | undefined}
          onAnswer={onAnswer}
        />
      );
    case "word-problem-builder":
      return (
        <WordProblemBuilderSimulator
          storyText={simulator.storyText as string}
          slots={simulator.slots as WordProblemSlot[]}
          expectedAnswer={simulator.expectedAnswer as string}
          onAnswer={onAnswer}
        />
      );
    case "ladder-method":
      return (
        <LadderMethodSimulator
          numbers={(simulator.numbers as number[]) ?? [12, 18]}
          highlightMode={(simulator.highlightMode as "fpb" | "kpk" | "both") ?? "both"}
          gcf={simulator.gcf as number | undefined}
          lcm={simulator.lcm as number | undefined}
          label={simulator.label as string | undefined}
        />
      );
    case "number-theory":
      return (
        <NumberTheoryVisualSimulator
          mode={
            (simulator.mode as
              | "factors"
              | "prime-check"
              | "prime-factorization"
              | "multiples"
              | "primes-in-range") ?? "factors"
          }
          number={simulator.number as number | undefined}
          factors={simulator.factors as number[] | undefined}
          isPrime={simulator.isPrime as boolean | undefined}
          factorization={simulator.factorization as string | undefined}
          multiples={simulator.multiples as { base: number; count: number } | undefined}
          range={simulator.range as { start: number; end: number; primes: number[] } | undefined}
        />
      );
    default:
      return (
        <div className="flex items-center justify-center h-40 text-gray-400 text-sm font-semibold">
          Simulator &quot;{simulator.type}&quot; belum tersedia.
        </div>
      );
  }
}
